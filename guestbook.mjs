// Nikahin — worker wedding-guestbook
//
// Route lama (JANGAN diubah — dipakai template undangan yang sudah jalan):
//   GET  /?weddingId=<slug>   daftar ucapan yang tampil
//   POST /                    tamu kirim ucapan
//
// Route dashboard (baru):
//   POST /rsvp                tamu kirim konfirmasi kehadiran
//   POST /rekap               rekap + daftar lengkap (butuh PIN)
//   POST /moderate            sembunyikan/tampilkan/hapus (butuh PIN)
//   POST /admin/pin           set PIN undangan (butuh ADMIN_KEY)
//
// PIN dikirim di body, bukan query, supaya tidak tercatat di log akses/referrer.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-admin-key, x-team-key",
  "Access-Control-Max-Age": "86400",
};

const RATE_WINDOW_MS = 10 * 60 * 1000;
const COMMENT_RATE_LIMIT = 5;
const RSVP_RATE_LIMIT = 5;
const PIN_RATE_LIMIT = 10;
const MAX_BODY_BYTES = 4096;
// Batas atas offset: D1 tetap harus memindai dan membuang baris sebesar offset,
// jadi offset raksasa = query mahal. Tamu tidak pernah butuh lewat dari ini.
const MAX_OFFSET = 10000;

const commentBuckets = new Map();
const rsvpBuckets = new Map();
const pinBuckets = new Map();

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extraHeaders },
  });
}

function cleanText(value, max) {
  return String(value ?? "")
    .replace(/[<>\u0000]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanWeddingId(value) {
  const id = cleanText(value, 64).toLowerCase();
  return /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(id) ? id : "";
}

function cleanPhone(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "").slice(0, 16);
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return digits;
}

// Waktu ditampilkan dalam WIB supaya tanggal tidak bergeser mengikuti
// timezone perangkat pembaca. Format: "19 Sep 2026 · 00.30".
const DISPLAY_TIME_ZONE = "Asia/Jakarta";

function guestStamp(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  try {
    const tanggal = new Intl.DateTimeFormat("id-ID", {
      day: "numeric", month: "short", year: "numeric", timeZone: DISPLAY_TIME_ZONE
    }).format(d);
    const jam = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: DISPLAY_TIME_ZONE
    }).format(d);
    return tanggal + " · " + jam.replace(":", ".");
  } catch {
    return "";
  }
}

function cleanAttendance(value) {
  const v = cleanText(value, 20).toLowerCase();
  if (["hadir", "ya", "yes", "1", "true"].includes(v)) return "hadir";
  if (["tidak", "no", "0", "false", "absen"].includes(v)) return "tidak";
  return "";
}

function requestAddress(request) {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return cf || fwd || "unknown";
}

function consumeRate(bucket, key, limit) {
  const now = Date.now();
  const recent = (bucket.get(key) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= limit) {
    bucket.set(key, recent);
    return Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000));
  }
  recent.push(now);
  bucket.set(key, recent);
  if (bucket.size > 10000) {
    for (const [k, arr] of bucket) {
      if (!arr.some((ts) => now - ts < RATE_WINDOW_MS)) bucket.delete(k);
      if (bucket.size <= 9000) break;
    }
  }
  return 0;
}

// --- Skrining ucapan dengan TypeSafe (Jev) ---
//
// Model mengembalikan PROBABILITAS, kode yang memutuskan. Ambang ada di
// SCREEN_THRESHOLDS supaya bisa dikalibrasi tanpa menyentuh prompt.
//
// Fail-open: kalau TypeSafe mati/timeout, ucapan tetap tayang. Salah menahan
// ucapan tulus tidak bisa diperbaiki (tamunya sudah pergi); salah meloloskan
// spam bisa dibereskan pemilik lewat /moderate.
//
// Ambang 0.80 dipilih dari kalibrasi 44 ucapan nyata + 7 kasus uji: yang bersih
// menumpuk di 0.01-0.02 dan yang buruk di 0.97-0.99, jadi tidak ada abu-abu.
const TYPESAFE_URL = "https://api.typesafe.ai/v1/systemone";
const TYPESAFE_MODEL = "jev-latest";
const TYPESAFE_TIMEOUT_MS = 6000;

const SCREEN_THRESHOLDS = {
  hide: 0.8,
  review: 0.4,
  severity_hide: 2.5,
};

// Pertanyaan dipisah per dimensi karena satu skor gabungan menyembunyikan
// alasan: hinaan dapat abusive 0.98 tapi spam 0.03, judi dapat spam 0.99 tapi
// abusive 0.11. Dipisah juga membuat ambang bisa disetel sendiri-sendiri.
const SCREEN_QUESTIONS = {
  spam: {
    type: "noul",
    instructions: "Is this message spam, advertising, or a promotion?",
    criteria: {
      true: "Promotes a product, service, gambling site, online loan, or includes a marketing link or invite code. Not a personal message to the couple.",
      false: "A personal message, greeting, prayer, or apology addressed to the couple or their wedding.",
    },
  },
  abusive: {
    type: "noul",
    instructions: "Does this message contain insults, harassment, or hate speech?",
    criteria: {
      true: "Attacks, mocks, or demeans a person or group; vulgar or hostile language.",
      false: "Polite, warm, or neutral in tone.",
    },
  },
  off_topic: {
    type: "noul",
    instructions: "Is this message unrelated to the wedding?",
    criteria: {
      true: "Not a wedding greeting, prayer, RSVP note, or message for the couple.",
      false: "Clearly addressed to the couple or their wedding.",
    },
  },
  has_link: {
    type: "noul",
    instructions: "Does the message contain a URL, phone number, or contact handle?",
    criteria: {
      true: "Contains http/https link, domain, phone number, or @handle.",
      false: "No link, number, or handle.",
    },
  },
  severity: {
    type: "score",
    instructions: "How harmful is this comment if shown publicly on a wedding invitation?",
    criteria: [
      "Safe: an ordinary warm greeting, prayer, or RSVP note.",
      "Mild: slightly off-topic or awkward, but harmless.",
      "Serious: clear spam, promotion, or insulting language.",
      "Severe: gambling, loan scam, fraud, or a malicious link.",
    ],
  },
};

// Mengembalikan {visible, review, scores} — TIDAK pernah melempar, supaya
// kegagalan TypeSafe tidak menjatuhkan jalur tamu. `visible: true` adalah
// jawaban aman untuk semua kegagalan.
async function screenComment(env, { name, message, weddingId }) {
  const pass = { visible: true, review: false, scores: null };
  const key = env.TYPESAFE_API_KEY;
  if (!key) return pass;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TYPESAFE_TIMEOUT_MS);
  try {
    const res = await fetch(TYPESAFE_URL, {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        state: {
          comment: { guest_name: name, message },
          context: { event: "Indonesian wedding invitation guestbook", wedding_id: weddingId },
        },
        model: TYPESAFE_MODEL,
        questions: SCREEN_QUESTIONS,
      }),
      signal: controller.signal,
    });
    if (!res.ok) return pass;
    const data = await res.json();
    const a = data?.answers;
    if (!a?.spam || !a?.abusive || !a?.severity) return pass;

    const spam = Number(a.spam.noul) || 0;
    const abusive = Number(a.abusive.noul) || 0;
    const severity = Number(a.severity.score) || 0;
    const worst = Math.max(spam, abusive);

    const scores = {
      spam, abusive,
      off_topic: Number(a.off_topic?.noul) || 0,
      has_link: Number(a.has_link?.noul) || 0,
      severity,
    };
    if (worst >= SCREEN_THRESHOLDS.hide || severity >= SCREEN_THRESHOLDS.severity_hide) {
      return { visible: false, review: false, scores };
    }
    // Zona ragu: tayang, tapi ditandai supaya pemilik bisa menilai sendiri.
    if (worst >= SCREEN_THRESHOLDS.review) return { visible: true, review: true, scores };
    return { visible: true, review: false, scores };
  } catch (_) {
    return pass;
  } finally {
    clearTimeout(timer);
  }
}

// --- PIN: hash SHA-256 dengan salt weddingId, dibanding constant-time ---

async function hashPin(weddingId, pin) {
  const data = new TextEncoder().encode(`nikahin:${weddingId}:${pin}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// PIN diturunkan dari (PIN_SECRET, weddingId, version) supaya worker bisa
// menghitungnya ulang kapan saja — itu yang membuat PIN selalu bisa
// ditampilkan lagi di editor tanpa perlu menyimpan PIN itu sendiri.
// "Generate ulang" = naikkan version.
async function derivePin(env, weddingId, version) {
  const secret = env.PIN_SECRET;
  if (!secret) return "";

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${weddingId}:${Number(version) || 1}`)
  );

  const bytes = new Uint8Array(mac);
  // 31 bit pertama → hindari bit tanda, lalu peras ke 6 digit.
  const num = ((bytes[0] & 0x7f) << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
  return String(100000 + (num % 900000));
}

// Token tamu bertanda tangan HMAC (Opsi A) diturunkan dari (PIN_SECRET, weddingId, guestName)
// sehingga setiap nama tamu punya 1 token resmi unik 6-karakter yang kebal tebakan/karangan.
async function deriveGuestToken(env, weddingId, guestName) {
  const secret = env.PIN_SECRET;
  if (!secret) return "";

  const normName = cleanText(guestName, 120).toLowerCase().replace(/\s+/g, " ");
  if (!normName) return "";

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`guest:${weddingId}:${normName}`)
  );

  const bytes = new Uint8Array(mac);
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let token = "";
  for (let i = 0; i < 6; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Mengembalikan { ok } atau { error, status }.
//
// Rate limit hanya dipakai untuk percobaan PIN yang GAGAL (anti brute-force):
// 10x salah dalam 10 menit = kunci. Login benar, /rekap, dan /moderate tidak
// pernah menghabiskan kuota — kalau ikut dihitung, dashboard akan terkunci
// hanya karena pengguna menghapus/menyembunyikan banyak baris sekaligus.
async function verifyPin(env, request, weddingId, pin) {
  const digits = String(pin ?? "").replace(/[^\d]/g, "").slice(0, 8);
  if (!digits) return { error: "pin_required", status: 401 };

  // PIN selalu 6 digit (derivePin: 100000–999999). Panjang selain 6 = PIN
  // salah — tanpa petunjuk minimal/maksimal, konsisten dengan dashboard.
  if (digits.length !== 6) return { error: "pin_invalid", status: 401 };

  const row = await env.DB.prepare("SELECT pin_hash FROM wedding_admin WHERE wedding_id = ?")
    .bind(weddingId).first();
  if (!row) return { error: "dashboard_not_set", status: 404 };

  const candidate = await hashPin(weddingId, digits);
  if (!safeEqual(candidate, row.pin_hash)) {
    const retryAfter = consumeRate(pinBuckets, `${requestAddress(request)}:${weddingId}`, PIN_RATE_LIMIT);
    if (retryAfter) return { error: "rate_limited", status: 429, retryAfter };
    return { error: "pin_invalid", status: 401 };
  }
  return { ok: true };
}

async function readJsonBody(request) {
  const declared = Number(request.headers.get("content-length") || "0");
  if (declared > MAX_BODY_BYTES) return { error: "payload_too_large", status: 413 };
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return { error: "payload_too_large", status: 413 };
  try {
    return { payload: JSON.parse(raw || "{}") };
  } catch {
    return { error: "invalid_json", status: 400 };
  }
}

// --- Route lama: ucapan (kontrak tidak berubah) ---

async function handleCommentsGet(request, env) {
  const url = new URL(request.url);
  const weddingId = cleanWeddingId(url.searchParams.get("weddingId"));
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const rawLimit = Number(url.searchParams.get("limit") || "10");
  const rawOffset = Number(url.searchParams.get("offset") || "0");
  const limit = Math.max(1, Math.min(10, Number.isFinite(rawLimit) ? Math.trunc(rawLimit) : 10));
  const offset = Math.max(0, Math.min(MAX_OFFSET, Number.isFinite(rawOffset) ? Math.trunc(rawOffset) : 0));

  const rows = await env.DB.prepare(
    `SELECT c.id, c.name, c.message, c.reply_message, c.replied_at, c.created_at,
            r.attendance, r.guests_count
     FROM wedding_comments c
     LEFT JOIN rsvp_responses r ON r.id = (
       SELECT matched.id FROM rsvp_responses matched
       WHERE matched.wedding_id = c.wedding_id AND matched.name = c.name
         AND matched.message = c.message AND matched.created_at = c.created_at
         AND matched.is_visible = 1
       ORDER BY matched.id ASC LIMIT 1
     )
     WHERE c.wedding_id = ? AND c.is_visible = 1
     ORDER BY c.created_at DESC, c.id DESC LIMIT ? OFFSET ?`
  ).bind(weddingId, limit + 1, offset).all();
  const visibleRows = rows.results || [];
  const comments = visibleRows.slice(0, limit).map(c => ({
    ...c,
    created_at_label: guestStamp(c.created_at),
    replied_at_label: guestStamp(c.replied_at)
  }));

  // Statistik publik: dipakai undangan untuk "Estimasi kehadiran tamu" supaya
  // sinkron dengan rekap dashboard (jumlah orang yang konfirmasi hadir).
  const statsRow = await env.DB.prepare(
    "SELECT COUNT(CASE WHEN attendance = 'hadir' THEN 1 END) AS hadir, COALESCE(SUM(CASE WHEN attendance = 'hadir' THEN guests_count ELSE 0 END), 0) AS hadir_orang FROM rsvp_responses WHERE wedding_id = ?"
  ).bind(weddingId).first();

  return json({
    ok: true,
    weddingId,
    comments,
    pagination: {
      limit,
      offset,
      next_offset: offset + comments.length,
      has_more: visibleRows.length > limit
    },
    stats: {
      hadir: Number(statsRow?.hadir) || 0,
      hadir_orang: Number(statsRow?.hadir_orang) || 0
    }
  });
}

async function handleCommentPost(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  if (cleanText(payload.website, 200)) return json({ ok: true });

  const weddingId = cleanWeddingId(payload.weddingId);
  const name = cleanText(payload.name, 80);
  const message = cleanText(payload.message, 500);

  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);
  if (!name || !message) return json({ ok: false, error: "name_and_message_required" }, 400);

  const retryAfter = consumeRate(commentBuckets, `${requestAddress(request)}:${weddingId}`, COMMENT_RATE_LIMIT);
  if (retryAfter) return json({ ok: false, error: "rate_limited", retry_after: retryAfter }, 429, { "Retry-After": String(retryAfter) });

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const screen = await screenComment(env, { name, message, weddingId });
  await env.DB.prepare(
    "INSERT INTO wedding_comments (id, wedding_id, name, message, is_visible, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(id, weddingId, name, message, screen.visible ? 1 : 0, createdAt).run();

  // Ucapan yang disembunyikan otomatis tetap dijawab ok: tamu tidak perlu tahu
  // ucapannya tersaring — memberi tahu hanya mengundang percobaan ulang.
  return json({ ok: true, weddingId, comment: { id, wedding_id: weddingId, name, message, created_at: createdAt } }, 201);
}

// --- Route baru: RSVP dari tamu (publik, tanpa PIN) ---

async function handleRsvpPost(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  if (cleanText(payload.website, 200)) return json({ ok: true });

  const weddingId = cleanWeddingId(payload.weddingId);
  const name = cleanText(payload.name, 80);
  const attendance = cleanAttendance(payload.attendance);

  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);
  if (!name) return json({ ok: false, error: "name_required" }, 400);
  if (!attendance) return json({ ok: false, error: "attendance_required" }, 400);
  if (name.length < 2) return json({ ok: false, error: "name_too_short" }, 400);

  const retryAfter = consumeRate(rsvpBuckets, `${requestAddress(request)}:${weddingId}`, RSVP_RATE_LIMIT);
  if (retryAfter) return json({ ok: false, error: "rate_limited", retry_after: retryAfter }, 429, { "Retry-After": String(retryAfter) });

  const rawCount = Number(payload.guests);
  if (attendance === "hadir" && payload.guests !== undefined && (!Number.isFinite(rawCount) || !Number.isInteger(rawCount) || rawCount < 1 || rawCount > 20)) {
    return json({ ok: false, error: "invalid_guest_count" }, 400);
  }
  const guests = attendance === "hadir" ? Math.max(1, Math.min(20, Number.isFinite(rawCount) ? Math.trunc(rawCount) : 1)) : 0;
  const phone = cleanPhone(payload.phone);
  const rawPhone = String(payload.phone ?? "").trim();
  if (rawPhone && phone.length < 8) return json({ ok: false, error: "invalid_phone" }, 400);
  const session = cleanText(payload.session, 40);
  const message = cleanText(payload.message, 500);
  const side = cleanText(payload.side, 20);
  const rawArrivalTime = String(payload.arrivalTime || payload.waktu || payload.time || "").trim();
  if (rawArrivalTime && !/^([01]\d|2[0-3])([:.][0-5]\d)$/.test(rawArrivalTime)) {
    return json({ ok: false, error: "invalid_arrival_time" }, 400);
  }
  const arrivalTime = cleanText(rawArrivalTime.replace(".", ":"), 8);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    "INSERT INTO rsvp_responses (id, wedding_id, name, phone, attendance, guests_count, session, message, side, arrival_time, is_visible, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)"
  ).bind(id, weddingId, name, phone, attendance, guests, session, message, side, arrivalTime, createdAt).run();

  // Sinkronisasi: RSVP + ucapan satu kiriman. Kalau ada pesan, salin ke
  // wedding_comments supaya tab "Ucapan" di dashboard dan daftar ucapan di
  // undangan (GET /?weddingId=) ikut terisi — bukan cuma tersimpan sebagai
  // baris kehadiran.
  if (message) {
    const commentId = crypto.randomUUID();
    const screen = await screenComment(env, { name, message, weddingId });
    await env.DB.prepare(
      "INSERT INTO wedding_comments (id, wedding_id, name, message, is_visible, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(commentId, weddingId, name, message, screen.visible ? 1 : 0, createdAt).run();
  }

  const statsRow = await env.DB.prepare(
    "SELECT COUNT(CASE WHEN attendance = 'hadir' THEN 1 END) AS hadir, COALESCE(SUM(CASE WHEN attendance = 'hadir' THEN guests_count ELSE 0 END), 0) AS hadir_orang FROM rsvp_responses WHERE wedding_id = ?"
  ).bind(weddingId).first();

  return json({
    ok: true,
    weddingId,
    rsvp: { id, name, attendance, guests_count: guests, side, arrival_time: arrivalTime, created_at: createdAt },
    stats: {
      hadir: Number(statsRow?.hadir) || 0,
      hadir_orang: Number(statsRow?.hadir_orang) || 0
    }
  }, 201);
}

// --- Route baru: rekap untuk dashboard (butuh PIN) ---

/*
 * Isi satu undangan: ringkasan + daftar tamu/ucapan/pelacakan.
 *
 * Dipisah dari handleRekap supaya dashboard founder bisa memakai query yang SAMA
 * lewat /founder/detail — bedanya hanya siapa yang berhak (PIN undangan vs PIN
 * founder). Menyalin blok ini ke handler kedua berarti dua sumber yang akan
 * menyimpang begitu salah satu diubah.
 *
 * Pemanggil bertanggung jawab atas otorisasi; fungsi ini tidak memeriksa apa pun.
 */
async function gatherWeddingData(env, weddingId, includeAll = false) {
  const rowLimit = includeAll ? "" : " LIMIT 500";
  const tokenFilter = includeAll ? "" : " AND token != 'demo'";
  const summary = await env.DB.prepare(
    `SELECT
       COUNT(*) AS total,
       SUM(CASE WHEN attendance = 'hadir' THEN 1 ELSE 0 END) AS hadir,
       SUM(CASE WHEN attendance = 'tidak' THEN 1 ELSE 0 END) AS tidak,
       SUM(CASE WHEN attendance = 'hadir' THEN guests_count ELSE 0 END) AS total_orang
     FROM rsvp_responses WHERE wedding_id = ?`
  ).bind(weddingId).first();

  const rsvpRows = await env.DB.prepare(
    `SELECT id, wedding_id, name, phone, attendance, guests_count, session, message, side, arrival_time, reply_message, replied_at, is_visible, created_at FROM rsvp_responses WHERE wedding_id = ? ORDER BY created_at DESC${rowLimit}`
  ).bind(weddingId).all();

  const commentRows = await env.DB.prepare(
    `SELECT id, wedding_id, name, message, reply_message, replied_at, is_visible, created_at FROM wedding_comments WHERE wedding_id = ? ORDER BY created_at DESC${rowLimit}`
  ).bind(weddingId).all();

  const guestTokenRows = await env.DB.prepare(
    `SELECT wedding_id, token, guest_name, view_count, last_viewed, created_at FROM guest_tokens WHERE wedding_id = ?${tokenFilter} ORDER BY last_viewed DESC${includeAll ? "" : " LIMIT 1000"}`
  ).bind(weddingId).all();

  const realGuestTokens = (guestTokenRows.results || []).filter(r => r.token !== "demo");
  const totalViews = realGuestTokens.reduce((acc, r) => acc + (Number(r.view_count) || 0), 0);
  const openedGuests = realGuestTokens.filter(r => (Number(r.view_count) || 0) > 0).length;

  return {
    weddingId,
    summary: {
      total: summary?.total || 0,
      hadir: summary?.hadir || 0,
      tidak: summary?.tidak || 0,
      total_orang: summary?.total_orang || 0,
      ucapan: (commentRows.results || []).length,
      views_total: totalViews,
      guests_opened: openedGuests,
    },
    rsvp: (rsvpRows.results || []).map(r => ({
      ...r,
      created_at_label: guestStamp(r.created_at),
      replied_at_label: guestStamp(r.replied_at)
    })),
    comments: (commentRows.results || []).map(c => ({
      ...c,
      created_at_label: guestStamp(c.created_at),
      replied_at_label: guestStamp(c.replied_at)
    })),
    guest_views: (guestTokenRows.results || []).map(g => ({
      ...g,
      last_viewed_label: guestStamp(g.last_viewed),
      created_at_label: guestStamp(g.created_at)
    })),
  };
}

async function handleRekap(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const auth = await verifyPin(env, request, weddingId, payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  return json({ ok: true, ...(await gatherWeddingData(env, weddingId)) });
}

// --- Route publik: daftar paket harga (sumber tunggal harga jual dari tabel packages) ---

async function handlePackagesGet(request, env) {
  const rows = await env.DB.prepare(
    "SELECT id, name, price_idr, badge, description, featured, included_json, values_json, sort_order FROM packages WHERE active = 1 ORDER BY sort_order ASC, price_idr ASC LIMIT 20"
  ).all();
  const packages = (rows.results || []).map((row) => ({
    id: row.id,
    name: row.name,
    price_idr: Number(row.price_idr),
    price_rb: String(Math.round(Number(row.price_idr) / 1000)),
    badge: row.badge || null,
    description: row.description || "",
    featured: !!row.featured,
    included: JSON.parse(row.included_json || "[]"),
    values: JSON.parse(row.values_json || "[]"),
    sort_order: Number(row.sort_order),
  }));
  return json({ version: 1, source: "cloudflare-d1-packages", packages });
}

// --- Moderasi dan hapus data undangan (PIN klien atau founder) ---

async function moderateWeddingRecord(env, weddingId, target, action, id) {
  const table = target === "comment" ? "wedding_comments" : "rsvp_responses";
  const original = await env.DB.prepare(
    `SELECT name, message, created_at FROM ${table} WHERE id = ? AND wedding_id = ?`
  ).bind(id, weddingId).first();
  if (!original) return { ok: false, error: "not_found" };

  const stmt = action === "delete"
    ? env.DB.prepare(`DELETE FROM ${table} WHERE id = ? AND wedding_id = ?`).bind(id, weddingId)
    : env.DB.prepare(`UPDATE ${table} SET is_visible = ? WHERE id = ? AND wedding_id = ?`)
        .bind(action === "show" ? 1 : 0, id, weddingId);
  const result = await stmt.run();
  const changed = result?.meta?.changes ?? 0;
  if (!changed) return { ok: false, error: "not_found" };

  let cascade = 0;
  if (original.message) {
    const mirrorTable = target === "comment" ? "rsvp_responses" : "wedding_comments";
    const mirrorStmt = action === "delete"
      ? env.DB.prepare(
          `DELETE FROM ${mirrorTable} WHERE wedding_id = ? AND name = ? AND message = ? AND created_at = ?`
        ).bind(weddingId, original.name, original.message, original.created_at)
      : env.DB.prepare(
          `UPDATE ${mirrorTable} SET is_visible = ? WHERE wedding_id = ? AND name = ? AND message = ? AND created_at = ?`
        ).bind(action === "show" ? 1 : 0, weddingId, original.name, original.message, original.created_at);
    const mirrorResult = await mirrorStmt.run();
    cascade = mirrorResult?.meta?.changes ?? 0;
  }
  return { ok: true, changed, cascade };
}

async function handleModerate(request, env, founderMode = false) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload || {};

  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);
  const auth = founderMode
    ? await verifyFounder(request, env, payload.pin)
    : await verifyPin(env, request, weddingId, payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  const target = cleanText(payload.target, 20).toLowerCase();
  const action = cleanText(payload.action, 20).toLowerCase();
  const id = cleanText(payload.id, 64);
  if (!id) return json({ ok: false, error: "id_required" }, 400);
  if (!["comment", "rsvp"].includes(target)) return json({ ok: false, error: "invalid_target" }, 400);
  if (!["hide", "show", "delete"].includes(action)) return json({ ok: false, error: "invalid_action" }, 400);

  const result = await moderateWeddingRecord(env, weddingId, target, action, id);
  if (!result.ok) return json({ ok: false, error: result.error }, 404);
  return json({ ok: true, weddingId, target, action, id, cascade: result.cascade });
}

async function handleFounderBulkModerate(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload || {};
  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);
  const auth = await verifyFounder(request, env, payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  const action = cleanText(payload.action, 20).toLowerCase();
  const items = Array.isArray(payload.items) ? payload.items : [];
  if (!["hide", "show", "delete"].includes(action)) return json({ ok: false, error: "invalid_action" }, 400);
  if (!items.length || items.length > 50) return json({ ok: false, error: "invalid_selection" }, 400);

  const normalized = items.map(item => ({
    target: cleanText(item?.target, 20).toLowerCase(),
    id: cleanText(item?.id, 64),
  }));
  if (normalized.some(item => !item.id || !["comment", "rsvp"].includes(item.target))) {
    return json({ ok: false, error: "invalid_selection" }, 400);
  }
  if (new Set(normalized.map(item => `${item.target}:${item.id}`)).size !== normalized.length) {
    return json({ ok: false, error: "duplicate_selection" }, 400);
  }

  let changed = 0;
  let cascade = 0;
  const skipped = [];
  for (const item of normalized) {
    const result = await moderateWeddingRecord(env, weddingId, item.target, action, item.id);
    if (result.ok) {
      changed += result.changed;
      cascade += result.cascade;
    } else {
      skipped.push({ ...item, error: result.error });
    }
  }
  return json({ ok: true, weddingId, action, changed, cascade, skipped });
}

async function handleFounderDeleteWedding(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload || {};
  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId || weddingId === FOUNDER_WEDDING_ID) {
    return json({ ok: false, error: "invalid_wedding_id" }, 400);
  }
  const auth = await verifyFounder(request, env, payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }
  if (cleanWeddingId(payload.confirmWeddingId) !== weddingId) {
    return json({ ok: false, error: "confirmation_mismatch" }, 400);
  }

  const statements = [
    env.DB.prepare("DELETE FROM guest_tokens WHERE wedding_id = ?").bind(weddingId),
    env.DB.prepare("DELETE FROM wedding_comments WHERE wedding_id = ?").bind(weddingId),
    env.DB.prepare("DELETE FROM rsvp_responses WHERE wedding_id = ?").bind(weddingId),
    env.DB.prepare("DELETE FROM wedding_admin WHERE wedding_id = ?").bind(weddingId),
  ];
  let results;
  if (typeof env.DB.batch === "function") {
    results = await env.DB.batch(statements);
  } else {
    results = [];
    for (const statement of statements) results.push(await statement.run());
  }
  const deleted = results.map(result => result?.meta?.changes ?? 0);
  return json({
    ok: true,
    weddingId,
    deleted: {
      guest_tokens: deleted[0],
      wedding_comments: deleted[1],
      rsvp_responses: deleted[2],
      wedding_admin: deleted[3],
    },
  });
}

// Founder dapat mengoreksi ucapan lintas undangan. Perubahan ikut disalin ke
// pasangan RSVP/ucapan yang dibuat oleh satu kiriman tamu.
async function handleFounderEditMessage(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const auth = await verifyFounder(request, env, payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  const target = cleanText(payload.target, 20).toLowerCase();
  const id = cleanText(payload.id, 64);
  const message = cleanText(payload.message, 500);
  if (!id) return json({ ok: false, error: "id_required" }, 400);
  if (!["comment", "rsvp"].includes(target)) return json({ ok: false, error: "invalid_target" }, 400);
  if (!message) return json({ ok: false, error: "message_required" }, 400);

  const table = target === "comment" ? "wedding_comments" : "rsvp_responses";
  const original = await env.DB.prepare(
    `SELECT name, message, created_at FROM ${table} WHERE id = ? AND wedding_id = ?`
  ).bind(id, weddingId).first();
  if (!original) return json({ ok: false, error: "not_found" }, 404);

  const result = await env.DB.prepare(
    `UPDATE ${table} SET message = ? WHERE id = ? AND wedding_id = ?`
  ).bind(message, id, weddingId).run();
  if (!(result?.meta?.changes ?? 0)) return json({ ok: false, error: "not_found" }, 404);

  let cascade = 0;
  if (original.message) {
    const mirrorTable = target === "comment" ? "rsvp_responses" : "wedding_comments";
    const mirrorResult = await env.DB.prepare(
      `UPDATE ${mirrorTable} SET message = ? WHERE wedding_id = ? AND name = ? AND message = ? AND created_at = ?`
    ).bind(message, weddingId, original.name, original.message, original.created_at).run();
    cascade = mirrorResult?.meta?.changes ?? 0;
  }

  return json({ ok: true, weddingId, target, id, message, cascade });
}

// --- Route baru: pelacakan buka undangan (Open-Rate Tracking) ---

async function handleTrackOpen(request, env) {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const isBot = /(whatsapp|facebookexternalhit|twitterbot|telegrambot|discordbot|googlebot|bingbot|crawler|spider|slackbot)/i.test(ua);
  if (isBot) return json({ ok: true, ignored: "bot" });

  let weddingId = "";
  let token = "";
  let guestName = "";

  const url = new URL(request.url);
  weddingId = cleanWeddingId(url.searchParams.get("weddingId"));
  token = cleanText(url.searchParams.get("token") || url.searchParams.get("u"), 16);

  const bodyText = await request.text();
  if (bodyText && bodyText.length <= MAX_BODY_BYTES) {
    try {
      const parsed = JSON.parse(bodyText);
      if (parsed.weddingId) weddingId = cleanWeddingId(parsed.weddingId);
      if (parsed.token) token = cleanText(parsed.token, 16);
      if (parsed.guestName) guestName = cleanText(parsed.guestName, 120);
    } catch (_) {}
  }

  if (!weddingId || !token || !guestName) {
    return json({ ok: false, error: "invalid_params" }, 400);
  }

  // Preview owner tidak dihitung sebagai pembukaan tamu.
  if (token === "demo") return json({ ok: true, weddingId, token, ignored: "demo" });
  if (!/^[A-Za-z0-9_-]{4,32}$/.test(token)) {
    return json({ ok: false, error: "invalid_token_format" }, 400);
  }
  const expectedToken = await deriveGuestToken(env, weddingId, guestName);
  if (!expectedToken || !safeEqual(token.toUpperCase(), expectedToken)) {
    return json({ ok: false, error: "invalid_token" }, 403);
  }

  const now = new Date().toISOString();
  await env.DB.prepare(`
    INSERT INTO guest_tokens (wedding_id, token, guest_name, view_count, last_viewed, created_at)
    VALUES (?, ?, ?, 1, ?, ?)
    ON CONFLICT(wedding_id, token) DO UPDATE SET
      view_count = guest_tokens.view_count + 1,
      last_viewed = excluded.last_viewed,
      guest_name = COALESCE(excluded.guest_name, guest_tokens.guest_name)
  `).bind(weddingId, token, guestName || null, now, now).run();

  return json({ ok: true, weddingId, token });
}

// --- Route baru: pembuat token resmi HMAC untuk nama tamu (Opsi A) ---

async function handleSignTokens(request, env) {
  const teamKey = env.TEAM_KEY;
  if (!teamKey) return json({ ok: false, error: "team_key_not_configured" }, 503);
  const provided = request.headers.get("x-team-key") || "";
  if (!safeEqual(provided, teamKey)) return json({ ok: false, error: "unauthorized" }, 401);

  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const rawNames = Array.isArray(payload.names) ? payload.names : [payload.name].filter(Boolean);
  const names = rawNames.map(n => cleanText(n, 120)).filter(Boolean).slice(0, 500);

  const tokens = {};
  for (const name of names) {
    tokens[name] = await deriveGuestToken(env, weddingId, name);
  }

  return json({
    ok: true,
    weddingId,
    tokens
  });
}

// --- Route baru: balas ucapan mempelai dari dashboard (butuh PIN) ---

async function handleReply(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const auth = await verifyPin(env, request, weddingId, payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  const id = cleanText(payload.id, 64);
  if (!id) return json({ ok: false, error: "id_required" }, 400);

  const replyMessage = cleanText(payload.reply_message, 500);
  const now = new Date().toISOString();

  await env.DB.prepare(
    "UPDATE wedding_comments SET reply_message = ?, replied_at = ? WHERE id = ? AND wedding_id = ?"
  ).bind(replyMessage || null, replyMessage ? now : null, id, weddingId).run();

  await env.DB.prepare(
    "UPDATE rsvp_responses SET reply_message = ?, replied_at = ? WHERE id = ? AND wedding_id = ?"
  ).bind(replyMessage || null, replyMessage ? now : null, id, weddingId).run();

  const rsvpRow = await env.DB.prepare(
    "SELECT name, message, created_at FROM rsvp_responses WHERE id = ? AND wedding_id = ?"
  ).bind(id, weddingId).first();

  if (rsvpRow && rsvpRow.message) {
    await env.DB.prepare(
      "UPDATE wedding_comments SET reply_message = ?, replied_at = ? WHERE wedding_id = ? AND name = ? AND message = ? AND created_at = ?"
    ).bind(replyMessage || null, replyMessage ? now : null, weddingId, rsvpRow.name, rsvpRow.message, rsvpRow.created_at).run();
  }

  return json({
    ok: true,
    weddingId,
    id,
    reply_message: replyMessage,
    replied_at: replyMessage ? now : null,
  });
}

// --- Route: daftar dashboard yang sudah aktif (butuh ADMIN_KEY) ---
// PIN tidak pernah dikembalikan — hanya hash yang tersimpan, dan itu memang
// tidak bisa dibalik. Endpoint ini untuk melihat slug mana yang sudah aktif.
//
// Catatan: /admin/pin (set PIN manual) dihapus 3 September 2026. Sejak panel
// PIN di SVE jalan, PIN selalu diturunkan dan bisa dilihat ulang, jadi jalur
// penulisan kedua ke wedding_admin tidak dibutuhkan — dan jalur itu justru
// membuat reveal bisa menimpa PIN manual yang sudah dipegang klien.

async function handleAdminList(request, env) {
  const adminKey = env.ADMIN_KEY;
  if (!adminKey) return json({ ok: false, error: "admin_key_not_configured" }, 503);

  const provided = request.headers.get("x-admin-key") || "";
  if (!safeEqual(provided, adminKey)) return json({ ok: false, error: "unauthorized" }, 401);

  const rows = await env.DB.prepare(
    `SELECT
       a.wedding_id,
       a.label,
       a.created_at,
       (SELECT COUNT(*) FROM rsvp_responses r WHERE r.wedding_id = a.wedding_id) AS rsvp_count,
       (SELECT COUNT(*) FROM wedding_comments c WHERE c.wedding_id = a.wedding_id) AS comment_count
     FROM wedding_admin a
     ORDER BY a.created_at DESC
     LIMIT 200`
  ).all();

  return json({ ok: true, weddings: rows.results || [] });
}

// --- Route dashboard founder: semua undangan sekaligus (butuh PIN founder) ---
//
// PIN founder adalah baris wedding_admin dengan wedding_id = "founder". Sengaja
// memakai verifyPin() yang sama, bukan kunci terpisah: PIN diketik saat runtime
// dan hanya hidup di memori halaman, sedangkan kunci apa pun yang ditanam di
// HTML halaman Scalev bisa dibaca siapa pun lewat View Source. Memakai verifyPin
// juga otomatis memberi rate limit PIN_RATE_LIMIT di jalur gagal.
//
// PIN ini membuka SEMUA data tamu semua undangan — itu memang tujuannya, tapi
// artinya PIN bocor = seluruh nama, nomor telepon, dan ucapan terbaca. Jangan
// dibagikan, dan ganti dengan menulis ulang pin_hash-nya kalau dicurigai.

const FOUNDER_WEDDING_ID = "founder";

async function verifyFounder(request, env, pin) {
  return verifyPin(env, request, FOUNDER_WEDDING_ID, pin);
}

// Ringkasan semua undangan dalam SATU query.
//
// Sumber daftarnya adalah UNION empat tabel, bukan wedding_admin saja: undangan
// yang sudah menerima RSVP tapi belum punya baris PIN tetap harus terlihat, dan
// undangan yang belum punya aktivitas sama sekali pun ikut muncul (angka nol).
// Kolom terakhir memakai MAX dari tiga MAX supaya "aktivitas terakhir" berarti
// apa pun yang terbaru — RSVP, ucapan, atau kunjungan tamu.
const FOUNDER_OVERVIEW_SQL = `
  SELECT w.wedding_id,
    CASE WHEN a.wedding_id IS NULL THEN 0 ELSE 1 END AS terdaftar,
    (SELECT COUNT(*) FROM rsvp_responses r WHERE r.wedding_id = w.wedding_id) AS rsvp,
    (SELECT COUNT(*) FROM rsvp_responses r WHERE r.wedding_id = w.wedding_id AND r.attendance = 'hadir') AS hadir,
    (SELECT COUNT(*) FROM rsvp_responses r WHERE r.wedding_id = w.wedding_id AND r.attendance = 'tidak') AS tidak,
    /* 'ragu' sudah tidak diterima cleanAttendance(), tapi 8 baris lama di
       islami-syari masih menyimpannya. Tanpa kolom ini, rsvp != hadir + tidak
       dan angkanya tampak tidak masuk akal di dashboard. */
    (SELECT COUNT(*) FROM rsvp_responses r WHERE r.wedding_id = w.wedding_id AND r.attendance NOT IN ('hadir', 'tidak')) AS ragu,
    (SELECT COALESCE(SUM(r.guests_count), 0) FROM rsvp_responses r WHERE r.wedding_id = w.wedding_id AND r.attendance = 'hadir') AS orang,
    (SELECT COUNT(*) FROM wedding_comments c WHERE c.wedding_id = w.wedding_id) AS komentar,
    (SELECT COUNT(*) FROM wedding_comments c WHERE c.wedding_id = w.wedding_id AND c.is_visible = 1) AS komentar_tampil,
    (SELECT COUNT(*) FROM guest_tokens g WHERE g.wedding_id = w.wedding_id AND g.token != 'demo') AS tamu,
    (SELECT COALESCE(SUM(g.view_count), 0) FROM guest_tokens g WHERE g.wedding_id = w.wedding_id AND g.token != 'demo') AS views,
    (SELECT COUNT(*) FROM guest_tokens g WHERE g.wedding_id = w.wedding_id AND g.token != 'demo' AND g.view_count > 0) AS tamu_buka,
    (SELECT MAX(t) FROM (
       SELECT MAX(r.created_at) AS t FROM rsvp_responses r WHERE r.wedding_id = w.wedding_id
       UNION ALL SELECT MAX(c.created_at) FROM wedding_comments c WHERE c.wedding_id = w.wedding_id
       UNION ALL SELECT MAX(g.last_viewed) FROM guest_tokens g WHERE g.wedding_id = w.wedding_id
    )) AS terakhir
  FROM (
    SELECT wedding_id FROM rsvp_responses
    UNION SELECT wedding_id FROM wedding_comments
    UNION SELECT wedding_id FROM guest_tokens
    UNION SELECT wedding_id FROM wedding_admin
  ) w
  LEFT JOIN wedding_admin a ON a.wedding_id = w.wedding_id
  ORDER BY terakhir DESC
`;

async function handleFounderOverview(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);

  const auth = await verifyFounder(request, env, body.payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  const rows = await env.DB.prepare(FOUNDER_OVERVIEW_SQL).all();
  const labels = await env.DB.prepare(
    "SELECT wedding_id, label FROM wedding_admin"
  ).all();

  const labelById = new Map(
    (labels.results || []).map(r => [r.wedding_id, r.label || ""])
  );

  return json({
    ok: true,
    weddings: (rows.results || []).map(r => ({
      ...r,
      label: labelById.get(r.wedding_id) || "",
    })),
  });
}

// Detail satu undangan untuk dashboard founder.
//
// Memakai gatherWeddingData() yang sama dengan /rekap — bedanya hanya otorisasi,
// plus satu kolom tambahan: `ragu`. /rekap sengaja tidak memuatnya (ada test yang
// mengunci bentuk itu untuk klien), tetapi dashboard founder perlu angka itu agar
// total RSVP terbagi habis dan tidak tampak ada data hilang.
async function handleFounderDetail(request, env) {
  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);

  const auth = await verifyFounder(request, env, body.payload.pin);
  if (!auth.ok) {
    const extra = auth.retryAfter ? { "Retry-After": String(auth.retryAfter) } : {};
    return json({ ok: false, error: auth.error, retry_after: auth.retryAfter }, auth.status, extra);
  }

  const weddingId = cleanWeddingId(body.payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const data = await gatherWeddingData(env, weddingId, true);
  const invitation = await env.DB.prepare(
    "SELECT wedding_id, label, created_at, pin_version FROM wedding_admin WHERE wedding_id = ?"
  ).bind(weddingId).first();
  const ragu = (data.rsvp || []).filter(
    r => r.attendance !== "hadir" && r.attendance !== "tidak"
  ).length;

  return json({ ok: true, ...data, invitation: invitation || null, summary: { ...data.summary, ragu } });
}

// --- Route baru: ambil / generate PIN untuk editor (butuh TEAM_KEY) ---
//
// mode "peek"     → PIN sekarang; buat baris + version 1 kalau belum ada.
// mode "generate" → naikkan version, hasilkan PIN baru.
//
// PIN tidak disimpan, hanya versinya — jadi PIN yang sama selalu bisa
// ditampilkan lagi saat editor dibuka ulang.

async function handleAdminReveal(request, env) {
  const teamKey = env.TEAM_KEY;
  if (!teamKey) return json({ ok: false, error: "team_key_not_configured" }, 503);

  const provided = request.headers.get("x-team-key") || "";
  if (!safeEqual(provided, teamKey)) return json({ ok: false, error: "unauthorized" }, 401);

  if (!env.PIN_SECRET) return json({ ok: false, error: "pin_secret_not_configured" }, 503);

  const body = await readJsonBody(request);
  if (body.error) return json({ ok: false, error: body.error }, body.status);
  const payload = body.payload;

  const weddingId = cleanWeddingId(payload.weddingId);
  if (!weddingId) return json({ ok: false, error: "invalid_wedding_id" }, 400);

  const regenerate = payload.mode === "generate";
  const label = cleanText(payload.label, 120);

  // Rate limit ikut ember PIN: endpoint ini mengembalikan PIN, jadi harus
  // sama ketatnya dengan percobaan login.
  const retryAfter = consumeRate(pinBuckets, `reveal:${requestAddress(request)}`, PIN_RATE_LIMIT);
  if (retryAfter) {
    return json({ ok: false, error: "rate_limited", retry_after: retryAfter }, 429, { "Retry-After": String(retryAfter) });
  }

  const row = await env.DB.prepare(
    "SELECT pin_version, label FROM wedding_admin WHERE wedding_id = ?"
  ).bind(weddingId).first();

  // Baris lama yang PIN-nya diset manual (pin_version NULL) tidak boleh
  // ditimpa tanpa diminta — PIN itu mungkin sudah dipegang klien.
  if (row && row.pin_version == null && !regenerate) {
    return json({ ok: false, error: "pin_set_manually" }, 409);
  }

  const version = regenerate ? (Number(row?.pin_version) || 0) + 1 : (Number(row?.pin_version) || 1);
  const pin = await derivePin(env, weddingId, version);
  if (!pin) return json({ ok: false, error: "pin_secret_not_configured" }, 503);

  const pinHash = await hashPin(weddingId, pin);
  const now = new Date().toISOString();
  const finalLabel = label || row?.label || "";

  await env.DB.prepare(
    "INSERT INTO wedding_admin (wedding_id, pin_hash, label, created_at, pin_version) VALUES (?, ?, ?, ?, ?) ON CONFLICT(wedding_id) DO UPDATE SET pin_hash = excluded.pin_hash, label = excluded.label, pin_version = excluded.pin_version"
  ).bind(weddingId, pinHash, finalLabel, now, version).run();

  return json({
    ok: true,
    weddingId,
    pin,
    label: finalLabel,
    version,
    created: !row,
    regenerated: regenerate
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

    try {
      if (!env?.DB) {
        console.error("Binding D1 'DB' tidak tersedia — cek konfigurasi worker");
        return json({ ok: false, error: "database_unavailable" }, 503);
      }

      const path = new URL(request.url).pathname.replace(/\/+$/, "") || "/";

      if (request.method === "GET" && path === "/") return handleCommentsGet(request, env);
      if (request.method === "GET" && path === "/packages") return handlePackagesGet(request, env);

      if (request.method === "POST") {
        if (path === "/") return handleCommentPost(request, env);
        if (path === "/rsvp") return handleRsvpPost(request, env);
        if (path === "/sign-tokens") return handleSignTokens(request, env);
        if (path === "/track-open") return handleTrackOpen(request, env);
        if (path === "/reply") return handleReply(request, env);
        if (path === "/rekap") return handleRekap(request, env);
        if (path === "/moderate") return handleModerate(request, env);
        if (path === "/admin/list") return handleAdminList(request, env);
        if (path === "/admin/reveal") return handleAdminReveal(request, env);
        if (path === "/founder/overview") return handleFounderOverview(request, env);
        if (path === "/founder/detail") return handleFounderDetail(request, env);
        if (path === "/founder/moderate") return handleModerate(request, env, true);
        if (path === "/founder/bulk-moderate") return handleFounderBulkModerate(request, env);
        if (path === "/founder/delete-wedding") return handleFounderDeleteWedding(request, env);
        if (path === "/founder/edit-message") return handleFounderEditMessage(request, env);
        return json({ ok: false, error: "not_found" }, 404);
      }

      return json({ ok: false, error: "method_not_allowed" }, 405);
    } catch (error) {
      console.error("Guestbook error", error);
      return json({ ok: false, error: "internal_error" }, 500);
    }
  },
};
