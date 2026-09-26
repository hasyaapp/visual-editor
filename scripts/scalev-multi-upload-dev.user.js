// ==UserScript==
// @name         Scalev Multi Upload (Dev / Template Builder)
// @namespace    nikahin-dev
// @version      5.17.0
// @updateURL    https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-multi-upload-dev.user.js
// @downloadURL  https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-multi-upload-dev.user.js
// @description  Pilih banyak berkas, salin URL CDN hasil unggahan, dan cari foto lama di Media Library Scalev
// @match        https://app.scalev.com/pages/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// LANGKAH NATIVE SCALEV (terekam 18 Sep 2026):
//   1. POST /v2/business/files  body {"filename","content_type","content_length","purpose":"media"}
//      → balas { file_url (CDN final), upload_url (presigned R2) }
//   2. PUT  upload_url          body = bytes berkas
//   3. GET  /v2/business/files  → refresh daftar
//
// Scalev mengompres DI BROWSER sebelum PUT, bukan di server. Terukur: PNG 5 MB mentah
// yang dikirim lewat API langsung tersimpan 5 MB utuh (server tidak menyentuhnya),
// sedangkan berkas yang sama lewat halaman ini terkirim ~50 KB. Jadi mengompresi
// berkas dengan cwebp lebih dulu SIA-SIA — Scalev tetap memprosesnya ulang. Batas
// dimensinya berbeda per halaman: HTML Mode maxWidth 1920, Builder 640.
//
// Jalur unggah tetap milik Scalev: skrip hanya menambahkan atribut `multiple` pada input
// unggah milik Scalev, menyuapkan berkas satu per satu, lalu membaca file_url dari
// respons POST yang sama supaya URL-nya bisa disalin.
//
// Verifikasi 18 Sep 2026: 9/9 berkas terunggah berurutan dengan cara ini.

(function () {
  'use strict';

  // Input Media Scalev. Sengaja memakai pencocokan SEBAGIAN (accept*="image"), bukan
  // kesamaan penuh, karena nilai `accept` berbeda antar halaman dan bisa berubah:
  //   HTML Mode : accept="image/*"
  //   Builder   : accept=".jpg,.jpeg,.png,.webp,.gif,.heic"   ← tidak cocok "image/*"
  // Selektor lama menuntut persis "image/*", jadi ia diam-diam tidak menemukan apa pun
  // di Builder. Diam itu berbahaya: tidak ada galat, hanya tidak terjadi apa-apa.
  //
  // Yang TIDAK dipakai: selektor longgar seperti membuang [accept*=".ico"] dan id meta*.
  // Itu terukur cocok juga dengan input "Import HTML" (accept=".html,text/html") di
  // halaman HTML Mode — gambar bisa tersuap ke sana dan merusak halaman. Penyaring
  // "image" di accept adalah pembeda yang benar dan sudah diuji di kedua halaman.
  const INPUT_SELECTOR = 'input[type="file"][accept*="image"]';
  const API_MARK = '/v2/business/files';
  const POLL_MS = 300;
  const UPLOAD_TIMEOUT_MS = 180000;
  // Berapa lama menunggu PUT sebelum menyimpulkan berkasnya ditolak Scalev. PUT sehat
  // selesai dalam hitungan detik, jadi 20 detik sudah longgar — dan jauh lebih baik
  // daripada menahan seluruh antrean 3 menit karena satu berkas rusak.
  const NO_PUT_MS = 20000;

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const results = [];

  // Respons POST terakhir. Unggahan berjalan serial (satu di-await sebelum lanjut),
  // jadi atribusinya aman tanpa perlu mencocokkan nama.
  let lastFileUrl = null;
  let r2Puts = 0;
  // Ukuran byte yang BENAR-BENAR dikirim ke R2 (setelah Scalev mengompres di browser).
  // Ini satu-satunya cara tahu kompresinya terjadi: berkas 5 MB bisa terkirim 50 KB.
  let lastPutBytes = null;

  // ---------- Tangkap respons API ----------
  function noteResponse(text) {
    try {
      const json = JSON.parse(text);
      const data = json && json.data;
      if (data && data.file_url) lastFileUrl = data.file_url;
    } catch (_) { /* bukan JSON, abaikan */ }
  }

  const origFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    noteAPIRequest(url, headerObject((init && init.headers) || (input && input.headers)));
    const response = await origFetch.apply(this, arguments);
    if (url.includes(API_MARK) && method === 'POST') {
      response.clone().text().then(noteResponse).catch(() => {});
    }
    if (/r2\.cloudflarestorage\.com/.test(url) && method === 'PUT') {
      r2Puts += 1;
      // Ukuran body PUT = byte sesudah kompresi Scalev. Dibaca dari body-nya, bukan dari
      // header content-length, karena header itu ikut terbaca sebelum kompresi selesai.
      const body = init && init.body;
      lastPutBytes = body && typeof body.size === 'number' ? body.size : null;
    }
    return response;
  };

  // Permintaan daftar media dilakukan app lewat XHR, jadi URL dan header-nya direkam
  // untuk dipakai ulang saat skrip memanggil API yang sama.
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  const origSetHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__sveMethod = method; this.__sveUrl = String(url || ''); this.__sveHeaders = {};
    return origOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (this.__sveHeaders) this.__sveHeaders[name] = value;
    return origSetHeader.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function () {
    noteAPIRequest(this.__sveUrl, this.__sveHeaders);
    if (this.__sveUrl.includes(API_MARK) && (this.__sveMethod || '').toUpperCase() === 'POST') {
      this.addEventListener('load', () => noteResponse(this.responseText));
    }
    return origSend.apply(this, arguments);
  };

  function headerObject(headers) {
    if (!headers) return null;
    if (Array.isArray(headers)) return Object.fromEntries(headers);
    if (typeof headers.forEach === 'function') {
      const out = {};
      headers.forEach((value, name) => { out[name] = value; });
      return out;
    }
    return headers;
  }

  // ---------- Aktifkan pilih-banyak pada input milik Scalev ----------
  function mediaInput() {
    const inSection = [...document.querySelectorAll(INPUT_SELECTOR)].find(i => i.closest('section'));
    return inSection || document.querySelector(INPUT_SELECTOR);
  }

  function enableMultiple() {
    const input = mediaInput();
    if (!input || input.dataset.sveMulti === '1') return;
    input.dataset.sveMulti = '1';
    input.multiple = true;
    input.setAttribute('multiple', '');
  }

  // ---------- Status di bawah tombol Upload Image ----------
  function setStatus(text) {
    const input = mediaInput();
    // Tempel ke <section>, bukan ke induk <label>. Induk label adalah baris flex
    // horizontal (judul + tombol), jadi menempel di situ membuat status jadi kolom
    // ketiga di samping tombol dan merusak tata letak.
    const host = input && input.closest('section');
    if (!host) return;
    let note = host.querySelector('[data-sve-status]');
    if (!note) {
      note = document.createElement('p');
      note.dataset.sveStatus = '';
      note.style.cssText = 'margin:10px 0 0;font-size:11px;line-height:16px;color:#74675f;white-space:pre-wrap;';
      host.append(note);
    }
    note.textContent = text;
  }

  // ---------- Unggah satu berkas ----------
  let busy = false;

  async function uploadOne(input, file) {
    const putsBefore = r2Puts;
    lastFileUrl = null;
    lastPutBytes = null;

    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    // Sukses dinilai dari PUT ke R2. Jumlah kartu di daftar tidak bisa dipakai:
    // Scalev me-refresh daftar lewat GET, bukan menambah kartu satu per satu.
    //
    // Berkas yang ditolak Scalev tidak pernah menghasilkan PUT, jadi tanpa batas
    // tambahan ia menunggu UPLOAD_TIMEOUT_MS penuh — 3 menit untuk satu berkas rusak,
    // dan berkas berikutnya di antrean ikut tertahan. PUT yang sehat terukur selesai
    // dalam hitungan detik (3 berkas berturut-turut: ~1 detik masing-masing), jadi
    // diam lebih dari NO_PUT_MS hampir pasti berarti berkasnya ditolak.
    const deadline = Date.now() + UPLOAD_TIMEOUT_MS;
    const batasDiam = Date.now() + NO_PUT_MS;
    while (Date.now() < deadline) {
      await sleep(POLL_MS);
      if (r2Puts > putsBefore) {
        // Beri jeda singkat agar respons POST sempat tercatat.
        for (let i = 0; i < 10 && !lastFileUrl; i++) await sleep(150);
        // Byte yang terkirim dibaca dari body PUT: itu ukuran sesudah Scalev mengompres
        // di browser. Berguna untuk membuktikan kompresinya benar-benar terjadi —
        // dan untuk memastikan tidak ada yang mengompresi manual lebih dulu (sia-sia).
        return { url: lastFileUrl, bytes: lastPutBytes };
      }
      if (Date.now() > batasDiam) return { url: null, bytes: null, ditolak: true };
    }
    return { url: null, bytes: null, ditolak: true };
  }

  async function onChangeCapture(event) {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'file') return;
    if (!input.multiple || busy) return;

    const files = [...(input.files || [])];
    if (files.length <= 1) return; // satu berkas: biarkan Scalev menanganinya

    event.stopImmediatePropagation();
    event.preventDefault();
    input.value = '';

    busy = true;
    const failed = [];
    for (const [i, file] of files.entries()) {
      setStatus((i + 1) + '/' + files.length + ' ' + file.name);
      let hasil = null;
      try { hasil = await uploadOne(input, file); } catch (e) { failed.push(file.name + ': ' + e.message); }
      if (hasil && hasil.url) {
        results.push({ source: file.name, url: hasil.url, bytes: hasil.bytes, sourceBytes: file.size });
      } else if (hasil && hasil.ditolak) {
        failed.push(file.name + ': ditolak Scalev (bukan gambar yang didukung?)');
      } else if (!failed.length) {
        failed.push(file.name + ': URL tidak tertangkap');
      }
      await sleep(500);
    }
    busy = false;
    input.value = '';

    window.__scalevUploaded = results;
    setStatus(results.length + '/' + files.length
      + (failed.length ? ' · gagal: ' + failed.join(', ') : ''));
    renderPanel();
  }

  // ---------- Panel hasil ----------
  function renderPanel() {
    let host = document.getElementById('sve-result-panel');
    if (!host) {
      host = document.createElement('div');
      host.id = 'sve-result-panel';
      host.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:2147483647;width:460px;'
        + 'max-height:40vh;overflow:auto;padding:10px 12px;border:2px solid #3f4232;border-radius:8px;'
        + 'background:#f7f0e8;font:11px/15px ui-monospace,Menlo,monospace;color:#332a24;'
        + 'box-shadow:0 8px 24px rgba(0,0,0,.25)';
      document.body.append(host);
    }
    if (!results.length) {
      host.innerHTML = '<b>URL</b>\n'
        + '<div style="margin-top:6px;color:#74675f">Pilih 2+ berkas.</div>';
      return;
    }
    const kb = n => typeof n === 'number' ? Math.round(n / 1024) + ' KB' : '?';
    // Ukuran ditampilkan sebelum -> sesudah. Scalev mengompres di browser, jadi selisih
    // ini bukti kompresinya bekerja. Kalau angkanya nyaris sama, berarti berkas itu
    // sudah dikompresi manual lebih dulu — kerja yang sia-sia, karena Scalev tetap
    // memprosesnya ulang.
    const rows = results.map(r => '  ' + r.source
      + '\n    ' + r.url
      + '\n    ' + kb(r.sourceBytes) + ' -> ' + kb(r.bytes)).join('\n');
    host.innerHTML = '<b>' + results.length + ' URL</b>\n'
      + '<pre style="margin:6px 0;white-space:pre-wrap">' + rows + '</pre>'
      + '<button id="sve-copy" style="margin-right:6px;padding:6px 12px;border:2px solid #3f4232;'
      + 'border-radius:6px;background:#3f4232;color:#fff;font-size:12px;font-weight:600;cursor:pointer">'
      + 'Salin</button>'
      + '<button id="sve-json" style="margin-right:6px;padding:6px 12px;border:2px solid #3f4232;'
      + 'border-radius:6px;background:#fff;color:#3f4232;font-size:12px;font-weight:600;cursor:pointer">'
      + 'JSON</button>'
      + '<button id="sve-map" style="padding:6px 12px;border:2px solid #3f4232;border-radius:6px;'
      + 'background:#fff;color:#3f4232;font-size:12px;font-weight:600;cursor:pointer">'
      + 'Peta</button>';

    host.querySelector('#sve-copy').onclick = async () => {
      const text = results.map(r => r.url).join('\n');
      try { await navigator.clipboard.writeText(text); setStatus('Tersalin'); }
      catch (_) { setStatus('Gagal salin'); }
    };
    host.querySelector('#sve-json').onclick = () => {
      const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'scalev-uploaded-urls.json';
      a.click();
      URL.revokeObjectURL(a.href);
    };
    /*
     * "Peta" menghasilkan bentuk yang dibaca build.mjs: MEDIA-URL-MAP.json.
     *
     * build.mjs mencocokkan aset lewat NAMA BERKAS (assetUrl -> MEDIA_MAP[bare]),
     * jadi kuncinya harus nama berkas, bukan nama node. Nama yang dipakai adalah
     * nama berkas yang dipilih di sini — dan itu memang nama kanvas untuk template
     * baru. Untuk aset lama (vintage-olive) kuncinya kebetulan image-N.png, karena
     * dulu belum ada konvensi penamaan; pemetaan itu tidak bisa ditebak, harus
     * disesuaikan manual saat menggabungkan ke peta yang sudah ada.
     *
     * Nilai URL diambil dari CDN final (bukan upload_url R2), karena itu yang dipakai
     * halaman. Scalev menambahkan prefiks timestamp pada nama di CDN — itu normal.
     */
    host.querySelector('#sve-map').onclick = async () => {
      const peta = {};
      for (const r of results) peta[r.source] = r.url;
      const teks = JSON.stringify(peta, null, 2);
      try {
        await navigator.clipboard.writeText(teks);
        setStatus('Peta tersalin (' + results.length + ' entri)');
      } catch (_) {
        setStatus('Gagal salin peta');
      }
    };
  }

  // ---------- Cari media ----------
  // Panel Media tidak punya kotak cari, dan GET /v2/business/files tidak menerima
  // parameter pencarian. Jadi daftarnya diambil lewat API yang sama memakai kredensial
  // permintaan app, lalu hasilnya dicetak ke wadah daftar bawaan Scalev — tanpa panel
  // hasil sendiri — dan kartu yang tidak cocok disembunyikan.
  const FILES_PATH = '/v2/business/files';
  const API_HOST = 'api.scalev.com';
  const PAGE_SIZE = 50;
  const MAX_PAGES = 60;  // pagar halaman per pencarian
  const PAGE_CHUNK = 12; // kartu per gelombang; sisanya menyusul saat discroll
  const CACHE_KEY = 'sve-media-index';
  const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 hari, deteksi unggahan baru lewat nama teratas
  // Nama parameter kursor tidak ada di dokumentasi mana pun, jadi kandidat dicoba satu
  // per satu dan yang benar-benar mengembalikan foto baru dipakai untuk halaman sisanya.
  const CURSOR_KEYS = ['last_id', 'before_id', 'starting_after', 'after', 'cursor', 'offset'];
  const PANEL_SELECTOR = '#tabContent > div > section';

  const index = new Map(); // key -> item API, sekaligus dedupe antar halaman
  let filesURL = null;     // permintaan app: sumber b_uid dan kredensial
  let bUid = null;
  let apiHeaders = null;
  let cursorKey = null;
  let lastId = null;
  let exhausted = false;
  let dirty = false;     // ada item baru yang belum disimpan ke cache
  let selfMutation = false; // true selagi skrip sendiri yang mengubah daftar
  let cacheReady = false;   // cache dibaca sekali per muat halaman
  let refreshed = false;    // halaman terbaru disegarkan sekali per muat halaman

  function noteAPIRequest(url, headers) {
    if (!url || !url.includes(API_HOST)) return;
    if (headers && Object.keys(headers).length) apiHeaders = headers;
    const found = /[?&]b_uid=([^&]+)/.exec(url);
    if (found) bUid = decodeURIComponent(found[1]);
    if (url.includes(FILES_PATH)) filesURL = url;
  }

  function addItems(items) {
    let added = 0;
    for (const item of items || []) {
      if (!item || !item.key || index.has(item.key)) continue;
      index.set(item.key, item);
      added++;
    }
    if (added) dirty = true;
    return added;
  }

  async function getPage(url) {
    const request = async headers => {
      const res = await fetch(url.toString(), { headers, credentials: 'include' });
      if (!res.ok) {
        const failure = new Error('gagal (HTTP ' + res.status + ')');
        failure.status = res.status;
        throw failure;
      }
      const json = await res.json();
      if (!json || !json.data) throw new Error('respons tidak dikenal');
      return json.data;
    };

    try {
      return await request(apiHeaders || {});
    } catch (error) {
      // Kredensial hasil tangkapan bisa kedaluwarsa di tengah pemindaian. Cookie sesi
      // app kadang masih diterima, jadi dicoba sekali lagi tanpa header.
      if (apiHeaders && (error.status === 401 || error.status === 403)) {
        try {
          return await request({});
        } catch (_) {
          throw new Error('sesi berakhir, muat ulang');
        }
      }
      throw error;
    }
  }

  function filesEndpoint() {
    if (!filesURL && !bUid) return null;
    const url = new URL(filesURL || 'https://' + API_HOST + FILES_PATH);
    // Buang kursor yang terbawa dari permintaan app supaya pemindaian selalu mulai
    // dari foto terbaru, bukan dari tengah daftar.
    for (const key of CURSOR_KEYS) url.searchParams.delete(key);
    url.searchParams.set('type', 'image');
    url.searchParams.set('purpose', 'media');
    url.searchParams.set('page_size', String(PAGE_SIZE));
    if (bUid) url.searchParams.set('b_uid', bUid);
    return url;
  }

  async function fetchPage() {
    const base = filesEndpoint();
    if (!base) return { error: 'kunci API belum ada, buka tab Media' };

    for (const key of (lastId ? (cursorKey ? [cursorKey] : CURSOR_KEYS) : [null])) {
      const url = new URL(base);
      if (key) url.searchParams.set(key, String(lastId));
      const data = await getPage(url).catch(error => ({ error: error.message }));
      if (data.error) return data;

      // Halaman tanpa foto baru berarti nama parameter kursornya salah: coba kandidat
      // berikutnya. Halaman pertama (tanpa kursor) selalu dipakai.
      const added = addItems(data.results);
      if (!key) rememberHead(data.results);
      if (lastId && !added && data.has_next) continue;

      if (key) cursorKey = key;
      lastId = data.last_id || null;
      if (!data.has_next || !lastId) exhausted = true;
      return data;
    }
    return { error: 'kursor tidak dikenal' };
  }

  // Ukuran dan tanggal diformat sekali per foto: toLocaleString mahal kalau dipanggil
  // ulang setiap daftar dicetak.
  function metaOf(item) {
    if (!item.sveMeta) {
      const size = item.size_in_bytes || 0;
      item.sveMeta = {
        kind: (item.content_type || 'image') + ' - ' + (size >= 1048576
          ? (size / 1048576).toFixed(1) + ' MB'
          : (size / 1024).toFixed(1) + ' KB'),
        stamp: item.inserted_at ? new Date(item.inserted_at).toLocaleString('id-ID', {
          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
        }) : '',
      };
    }
    return item.sveMeta;
  }

  // Kartu hasil memakai kelas yang sama dengan kartu Media milik Scalev supaya
  // tampilannya identik tanpa CSS sendiri.
  // Satu kartu dibangun sekali lalu dipakai ulang: ganti kata kunci hanya menulis ulang
  // isi kartu, bukan membuat 60 elemen baru tiap ketikan.
  function buildCard() {
    const article = document.createElement('article');
    article.dataset.sveHit = '1';
    article.className = 'rounded border-2 border-gray-400 bg-white p-[10px]';
    // Kartu di luar layar dilewati browser saat layout dan paint.
    article.style.cssText = 'content-visibility:auto;contain-intrinsic-size:auto 150px;';

    const head = document.createElement('div');
    head.className = 'flex gap-[10px]';

    const frame = document.createElement('div');
    frame.className = 'h-[68px] w-[68px] shrink-0 overflow-hidden rounded bg-gray-150';

    const thumb = document.createElement('img');
    thumb.loading = 'lazy';
    thumb.decoding = 'async';
    thumb.className = 'h-full w-full object-cover';

    const body = document.createElement('div');
    body.className = 'min-w-0 flex-1';

    const name = document.createElement('p');
    name.className = 'truncate text-[12px] font-[600] text-black-950';

    const kind = document.createElement('p');
    kind.className = 'mt-[3px] text-[10px] leading-[14px] text-black-200';

    const stamp = document.createElement('p');
    stamp.className = 'mt-[2px] text-[10px] leading-[14px] text-black-200';

    const urlRow = document.createElement('div');
    urlRow.className = 'mt-[10px] flex min-w-0 rounded border bg-gray-150';

    const url = document.createElement('input');
    url.readOnly = true;
    url.className = 'min-w-0 flex-1 bg-transparent px-[8px] py-[7px] text-[10px] text-black-950 focus:outline-none';

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copy URL';
    copy.className = 'flex shrink-0 items-center gap-[4px] border-l bg-white px-[8px] text-[11px] font-[600] text-primary';
    copy.onclick = async () => {
      try { await navigator.clipboard.writeText(url.value); copy.textContent = 'Tersalin'; }
      catch (_) { copy.textContent = 'Gagal'; }
    };

    body.append(name, kind, stamp);
    frame.append(thumb);
    head.append(frame, body);
    urlRow.append(url, copy);
    article.append(head, urlRow);
    article.sveParts = { thumb, name, kind, stamp, url, copy };
    return article;
  }

  function fillCard(card, item) {
    const meta = metaOf(item);
    const parts = card.sveParts;
    // src hanya ditulis kalau fotonya beda, supaya gambar tidak dimuat ulang.
    if (parts.thumb.getAttribute('src') !== item.file_url) parts.thumb.src = item.file_url || '';
    parts.thumb.alt = item.filename || '';
    parts.name.title = item.filename || '';
    parts.name.textContent = item.filename || '';
    parts.kind.textContent = meta.kind;
    parts.stamp.textContent = meta.stamp;
    parts.url.value = item.file_url || '';
    if (parts.copy.textContent !== 'Copy URL') parts.copy.textContent = 'Copy URL';
  }

  // Nama kecil disimpan sekali per foto supaya penyaringan tidak mengubah 500-an
  // string tiap halaman masuk.
  function itemName(item) {
    if (item.sveName === undefined) item.sveName = (item.filename || '').toLowerCase();
    return item.sveName;
  }

  function safeStorage() {
    try {
      return typeof localStorage === 'undefined' ? null : localStorage;
    } catch (_) {
      return null; // diblokir browser
    }
  }

  // Daftar media jarang berubah, jadi hasil pemindaian disimpan: buka halaman lagi
  // berarti tidak perlu mengunduh 20 halaman untuk mencari nama yang sama.
  function readCache() {
    const storage = safeStorage();
    if (!storage || !bUid) return;
    try {
      const saved = JSON.parse(storage.getItem(CACHE_KEY) || 'null');
      if (!saved || saved.v !== 1 || saved.uid !== bUid) return;
      if (Date.now() - saved.at > CACHE_TTL) return;
      for (const item of saved.items || []) if (item && item.key) index.set(item.key, item);
      lastId = saved.lastId || null;
      cachedHead = saved.head || null;
      exhausted = Boolean(saved.exhausted);
    } catch (_) { /* cache rusak, abaikan */ }
  }

  function writeCache() {
    const storage = safeStorage();
    // Tidak ada item baru: menulis ulang 800-an item tiap pencarian hanya membuang waktu.
    if (!storage || !bUid || !dirty) return;
    dirty = false;
    try {
      storage.setItem(CACHE_KEY, JSON.stringify({
        v: 1, uid: bUid, at: Date.now(), head: cachedHead, lastId, exhausted, items: [...index.values()],
      }));
    } catch (_) { /* kuota penuh, cache dilewati */ }
  }

  // Halaman terbaru tetap diambil sekali per muat halaman supaya unggahan baru ikut
  // terbaca; sisanya dipakai dari cache.
  let cachedHead = null; // nama foto terbaru yang kita punya

  function rememberHead(results) {
    const first = (results || []).find(item => item && item.filename);
    if (first) cachedHead = first.filename;
  }

  // Daftar bawaan sudah memuat foto terbaru versi Scalev sendiri, jadi itu dipakai sebagai
  // penanda: kalau sama dengan yang kita punya, tidak perlu permintaan sama sekali.
  function newestNativeName() {
    const list = resultList();
    if (!list) return null;
    for (const node of [...list.children]) {
      if (node.tagName !== 'ARTICLE') continue;
      if (node.dataset && node.dataset.sveHit) continue;
      const title = node.querySelector('p[title]');
      if (title) return title.getAttribute('title');
    }
    return null;
  }

  async function refreshHead() {
    const base = filesEndpoint();
    if (!base) return;
    const data = await getPage(base).catch(() => null);
    if (!data || !data.results) return;
    rememberHead(data.results);

    const fresh = data.results.filter(item => item && item.key && !index.has(item.key));
    if (!fresh.length) return;
    dirty = true;
    const rest = [...index.values()];
    index.clear();
    for (const item of fresh) index.set(item.key, item);
    for (const item of rest) index.set(item.key, item);
  }

  function searchBox() {
    return document.getElementById('sve-search');
  }

  // Wadah daftar bawaan tepat di bawah kotak cari: di situ hasil dicetak.
  function resultList() {
    const box = searchBox();
    return box ? box.nextElementSibling : null;
  }

  function matches() {
    const box = searchBox();
    const q = box ? box.querySelector('input').value.trim().toLowerCase() : '';
    if (!q) return [];
    return [...index.values()].filter(item => itemName(item).includes(q));
  }

  const cardPool = [];          // kartu yang dipakai ulang antar pencarian
  let renderedCount = 0;        // berapa kartu yang sedang tampil
  let renderLimit = PAGE_CHUNK; // kartu yang dicetak sekarang; bertambah saat discroll
  let lastQuery = null;         // kata kunci yang sedang tampil
  let rerun = null;             // diisi addSearch supaya penambahan bisa memicu ulang
  let expand = null;            // tombol penambah
  let sentinel = null;          // penanda ujung daftar untuk IntersectionObserver
  let observer = null;

  // Kartu menyusul sendiri saat ujung daftar mendekat, jadi tidak ada jumlah yang perlu
  // ditebak: yang tercetak hanya sejauh yang kamu lihat.
  function watchScroll() {
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.dataset.sveSentinel = '1';
      sentinel.style.cssText = 'height:1px;';
    }
    if (typeof IntersectionObserver !== 'function') return; // tombol jadi cadangannya
    if (!observer) {
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        renderLimit += PAGE_CHUNK;
        if (rerun) rerun();
      }, { rootMargin: '240px' });
    }
    observer.observe(sentinel);
  }

  // Cadangan kalau pengguna tidak menggulir atau memakai keyboard.
  function expandButton() {
    if (expand) return expand;
    expand = document.createElement('button');
    expand.type = 'button';
    expand.dataset.sveMore = '1';
    expand.textContent = 'Muat ' + PAGE_CHUNK + ' lagi';
    expand.className = 'inline-flex font-medium focus:outline-none border-2 border-primary text-[12px] bg-white text-primary min-w-[80px] transform items-center justify-center px-4 py-[10px] text-center transition duration-100 ease-in-out rounded';
    expand.onclick = () => { renderLimit += PAGE_CHUNK; if (rerun) rerun(); };
    return expand;
  }

  function resetRendered() {
    for (const card of cardPool) card.remove();
    if (expand) expand.remove();
    if (sentinel) sentinel.remove();
    // Kolam dikembalikan ke satu gelombang supaya perluasan tadi tidak menahan memori.
    if (cardPool.length > PAGE_CHUNK) cardPool.length = PAGE_CHUNK;
    renderLimit = PAGE_CHUNK;
    lastQuery = null;
    renderedCount = 0;
  }

  // Daftar perlu dipasang ulang kalau kartu skrip hilang atau kartu bawaan kembali tampil
  // setelah Scalev merender ulang.
  function stale() {
    const list = resultList();
    if (!list) return false;
    if (renderedCount && (!cardPool[0] || !list.contains(cardPool[0]))) return true;

    const scope = list.parentElement || list;
    for (const container of [...scope.children]) {
      for (const node of [...container.children]) {
        if (node.tagName !== 'ARTICLE') continue;
        if (node.dataset && node.dataset.sveHit) continue;
        if (node.style.display !== 'none') return true;
      }
    }
    return false;
  }

  function updateList(found) {
    const box = searchBox();
    const list = resultList();
    if (!box || !list) return;

    // Wadah daftar kedua memuat kartu yang sama, jadi semuanya ikut diatur. Yang disentuh
    // hanya anak langsung, jadi tidak ada penyisiran seluruh pohon DOM tiap halaman.
    const scope = list.parentElement || list;
    const query = box.querySelector('input').value.trim().toLowerCase();
    let more = null;

    selfMutation = true;
    try {
      for (const container of [...scope.children]) {
        for (const node of [...container.children]) {
          if (node.dataset && node.dataset.sveHit) continue;
          if (node.tagName === 'ARTICLE') {
            node.style.display = query ? 'none' : '';
          } else if (node.tagName === 'BUTTON' && /load more|muat lebih/i.test(node.textContent)) {
            node.style.display = query ? 'none' : '';
            if (container === list && !more) more = node;
          }
        }
      }

      if (!query) { resetRendered(); return; }
      // Kata kunci baru mulai dari satu gelombang lagi.
      if (query !== lastQuery) { lastQuery = query; renderLimit = PAGE_CHUNK; }

      const shown = found.slice(0, renderLimit);
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < shown.length; i++) {
        if (!cardPool[i]) cardPool[i] = buildCard();
        fillCard(cardPool[i], shown[i]);
        fragment.append(cardPool[i]); // memindahkan kartu, bukan membuat ulang
      }
      for (let i = shown.length; i < cardPool.length; i++) cardPool[i].remove();

      list.insertBefore(fragment, more); // satu kali sisip untuk seluruh kartu

      // Masih ada hasil yang belum tercetak: sisanya menyusul saat discroll, dan tombolnya
      // disediakan sebagai cadangan (termasuk untuk pengguna keyboard).
      if (found.length > shown.length) {
        watchScroll();
        list.insertBefore(sentinel, more);
        list.insertBefore(expandButton(), more);
      } else {
        if (sentinel) sentinel.remove();
        if (expand) expand.remove();
      }

      renderedCount = shown.length;
    } finally {
      // Biar MutationObserver tahu mutasi ini ulah skrip sendiri, bukan Scalev.
      setTimeout(() => { selfMutation = false; }, 0);
    }
  }

  function addSearch() {
    const panel = document.querySelector(PANEL_SELECTOR);
    if (!panel) return;

    const box = searchBox();
    if (box) {
      // Cuma dikerjakan kalau daftar benar-benar disentuh Scalev, bukan tiap mutasi.
      if (box.querySelector('input').value.trim() && stale()) {
        resetRendered();
        updateList(matches());
      }
      return;
    }

    // Kotak cari bergaya section Scalev, tepat di atas daftar media.
    const host = document.createElement('section');
    host.id = 'sve-search';
    host.className = 'mb-[16px] rounded border-2 border-gray-400 p-[12px]';

    const header = document.createElement('div');
    header.className = 'flex items-start gap-[12px]';

    const heading = document.createElement('div');
    heading.className = 'min-w-0 flex-1';

    const title = document.createElement('p');
    title.className = 'text-[13px] font-[600] text-black-950';
    title.textContent = 'Cari Foto';

    heading.append(title);
    header.append(heading);

    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Nama foto...';
    input.className = 'mt-[10px] w-full rounded border bg-white px-[8px] py-[7px] text-[12px] text-black-950 focus:outline-none';

    const note = document.createElement('p');
    note.className = 'mt-[4px] text-[11px] leading-[16px] text-black-200';

    let token = 0;
    let timer = 0;

    function report(found, suffix) {
      if (!input.value.trim()) { note.textContent = ''; return; }
      note.textContent = found.length + ' hasil · ' + index.size + ' foto'
        + (exhausted ? '' : ' diperiksa') + (suffix || '');
    }

    async function run() {
      const mine = ++token;
      if (!input.value.trim()) { updateList([]); note.textContent = ''; return; }

      if (!cacheReady) { cacheReady = true; readCache(); }
      const warm = index.size > 0;

      let found = matches();
      report(found, '…');
      updateList(found);

      // Hanya disegarkan kalau daftar bawaan menunjukkan foto terbaru yang belum kita punya.
      if (!refreshed) {
        refreshed = true;
        const head = newestNativeName();
        if (warm && (!cachedHead || !head || head !== cachedHead)) {
          await refreshHead();
          if (mine !== token) return;
          found = matches();
          report(found, '…');
          updateList(found);
        }
      }

      let pages = 0;
      while (!exhausted && pages < MAX_PAGES) {
        const data = await fetchPage();
        if (mine !== token) return; // pengguna mengetik lagi, pencarian ini dibuang
        pages++;
        if (data.error) {
          report(matches(), ' · ' + data.error);
          updateList(matches());
          return;
        }
        found = matches();
        report(found, '…');
        updateList(found);
      }

      writeCache();
      report(found, exhausted ? '' : ' · batas ' + MAX_PAGES + ' halaman');
      updateList(found);
    }

    input.oninput = () => {
      clearTimeout(timer);
      timer = setTimeout(run, 300);
    };

    rerun = run;
    host.append(header, input, note);
    panel.after(host);
  }

  function mount() {
    enableMultiple();
    addSearch();
  }

  document.addEventListener('change', onChangeCapture, true);

  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled || selfMutation) return;
    scheduled = true;
    setTimeout(() => { scheduled = false; mount(); }, 500);
  }).observe(document.body, { childList: true, subtree: true });

  mount();
  renderPanel();
})();
