# STRICT SYNC RULE — Wedding Template × Scalev HTML Mode × Visual Editor

**Status:** CURRENT CANONICAL SPEC

**Source of truth:** `scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js`

> Doc ini **tidak terikat label versi** userscript (mis. `0.24.5`) atau
> product version (mis. `0.9.5`). Saat userscript di-bump ke versi lebih
> baru, doc ini tetap valid **selama** aturan mekanis di bawah ini masih
> match dengan source. Prosedur verifikasi: lihat §19 di akhir dokumen.

**Editor version terakhir terverifikasi (label):** product `0.9.5`,
userscript `0.24.5`, ID `sve77`. Hash dan label akan diperbarui hanya saat
kontrak mekanis berubah; bump label tanpa perubahan kontrak tidak
memerlukan update doc.

**Editor SHA-256 terverifikasi:** belum di-hash ulang — recompute dengan
`shasum -a 256 "scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js"`
setiap kali akan commit perubahan kontrak.

**Terakhir diverifikasi:** 27 Agustus 2026

**Versi kontrak:** aturan mekanis di bawah ini berasal dari source
`…0.9.5.js` per 27 Agustus 2026. Setiap aturan merujuk ke identifier di
source (fungsi, konstanta, atau regex) sehingga bisa di-crosscheck tanpa
bergantung pada label versi.

Dokumen ini adalah source of truth mandiri untuk fresh context lintas chat/LLM.
Baca dokumen ini secara utuh dan gunakan sebagai satu-satunya kontrak STRICT-SYNC
untuk membuat template baru yang kompatibel.

---

# 0. PRECEDENCE DAN BAHASA NORMATIF

## 0.1 Precedence

Untuk keputusan produk, konten, dan repository:

```text
1. Instruksi owner terbaru
2. PRD.md dan AGENTS.md
3. Dokumen ini
4. Implementasi production-tested yang masih aktif
5. Asumsi generator/agent
```

Untuk fakta mekanis tentang apa yang dibaca, ditolak, atau disimpan oleh editor,
implementasi Visual Editor source (lihat `scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js`)
adalah executable compatibility oracle. Jika kalimat dalam dokumen ini ambigu,
pilih bentuk yang benar-benar lolos aturan mekanis source tanpa mengurangi
hard rule produk.

## 0.2 Kata kunci

- **MUST / WAJIB**: satu kegagalan menjadikan gate terkait FAIL.
- **MUST NOT / DILARANG**: satu pelanggaran menjadikan gate terkait FAIL.
- **SHOULD / SEBAIKNYA**: default yang diharapkan; penyimpangan perlu alasan.
- **MAY / BOLEH**: opsional.

## 0.3 Tiga gate yang berbeda

Jangan mencampur tiga lapisan ini:

| Gate | Yang dinilai | Contoh |
|---|---|---|
| Generator/source gate | baseline template baru atau demo | 21 section tersedia, default ON, data demo usable |
| Editor compatibility gate | kontrak yang diparse dan disimpan editor | static `CONFIG`, explicit `SVE_SCHEMA`, path/type aman, struktur HTML lengkap |
| Public runtime gate | perilaku undangan untuk tamu | cover, audio, order/visibility, guestbook, gallery, security |

Nilai `false` pada visibility adalah valid setelah user mematikan section yang
memang hideable melalui Visual Editor. Itu tidak membatalkan aturan bahwa baseline
generator untuk template baru/demo harus mulai dari `true`. `cover` dan `footer`
adalah immutable public sections; Footer tetap membawa `sections.footer:true`
untuk kontrak mekanis editor, tetapi tidak mempunyai toggle hide.

### 0.3.1 Hard structural gate editor

Editor menjalankan `validateCompleteTemplateDocument` yang memblokir save
ketika salah satu struktur berikut tidak terpenuhi. Ini bukan saran, ini adalah
gate. Generator chat yang menulis template final ke Scalev WAJAB lulus:

```text
- DOCTYPE case-insensitive `<!doctype html>`
- <html> root + <head> + <body>
- <html lang="id">        (bukan "en", bukan kosong)
- <title> ada di <head>
- Tepat satu <style> dan berada di dalam <head>
- Tidak ada <style> di <body>
- Tepat satu <script> di <body> dan merupakan lastElementChild body
- <script> inline (tidak ada atribut src)
- Root terdeteksi: ada [data-sve-template] ATAU <main id>
- CONFIG + SVE_SCHEMA terbaca (lihat §3 dan §5)
- Tidak ada <style>...</style> di body
```

Jika salah satu di atas gagal, `importCompleteHtmlFile` melempar error dengan
pesan dari blocker pertama. Library template publik (`template-library`
endpoint) mengembalikan `validation.blockers[0]` sebagai alasan gagal import.

## 0.4 Arti status editor

- `BLOCKER / Masalah`: save dari tombol Visual Editor diblokir.
- `WARNING / Perlu dicek`: save diizinkan, tetapi operator wajib meninjau risiko.
- `PASS / Siap`: scanner editor tidak menemukan blocker/warning yang dikenalnya.

Scanner bukan pengganti browser QA, CSP production test, atau review source.

---

# 1. SCALEV HTML MODE WEDDING PROFILE

Wedding Profile adalah specialization di atas container native **Scalev HTML
Sales Page**. Label page type tersebut menentukan flow Import HTML dan runtime
host, bukan kewajiban membuat sales funnel generik.

Wedding template tetap merupakan landing experience, bukan product/store page.

## 1.1 Balance dengan instruksi native Scalev

| Native Scalev context | Resolusi Wedding Profile |
|---|---|
| Mode `HTML Sales Page` | Dipakai sebagai container/import mode; public content tetap undangan wedding |
| `store:null` atau Store Context belum dipilih | Dilarang membuat checkout, payment, shipping, bundle, stock, atau submit order |
| Intent landing page belum diisi | Gunakan intent wedding dan Universal Master 21 section dari dokumen ini |
| Saran testimonial/FAQ/lead magnet | Bukan mandatory wedding section; hanya ditambahkan jika owner/brief meminta |
| Nama page seperti `MASTER TEMPLATE PAGE (duplicated)` | Metadata editor, bukan copy yang dirender kepada tamu |
| Slug seperti `alya-fajar` | Deployment context dan sumber sinkronisasi `guestbook.weddingId`, bukan hero heading |
| Data `page` dari `Scalev.data.get()` | Optional public enhancement; static CONFIG tetap menjadi fallback utama |

Instruksi native Scalev mengatur envelope page-safe. Dokumen ini mengatur wedding
content/schema/runtime di dalam envelope tersebut. Generic sales-page suggestion
tidak boleh menghapus atau mengganti kontrak 21 wedding section.

## 1.2 Dilarang

- checkout, cart, payment, atau order flow;
- asumsi product/store context tersedia;
- private Scalev endpoint;
- secret, service role, private API key, OAuth credential, atau token bisnis;
- `eval()`, `new Function()`, dan `javascript:` URL;
- dependency WordPress, Elementor, WeddingPress, atau jQuery pada runtime final.

## 1.3 Runtime Scalev yang boleh digunakan

Page-safe runtime boleh memakai API publik berikut bila memang tersedia:

```js
function readScalevContext() {
  try {
    const data = window.Scalev?.data?.get?.() || {};

    return {
      page: data.page || {},
      store: data.store || null
    };
  } catch (_) {
    return {
      page: {},
      store: null
    };
  }
}
```

Template MUST tetap mempunyai static fallback yang selesai dan usable ketika
`window.Scalev`, runtime data, atau analytics tidak tersedia. First paint tidak
boleh menunggu runtime call. `store:null` adalah kondisi normal dan bukan error.

Analytics hanya memakai provider native yang terdokumentasi:

```text
facebook
tiktok
kwai
```

Canonical defensive wrapper:

```js
const SCALEV_ANALYTICS_PROVIDERS = new Set([
  "facebook",
  "tiktok",
  "kwai"
]);

function trackWeddingEvent(provider, payload) {
  if (!SCALEV_ANALYTICS_PROVIDERS.has(provider)) {
    return false;
  }

  try {
    if (typeof window.Scalev?.analytics?.track !== "function") {
      return false;
    }

    window.Scalev.analytics.track(provider, payload);
    return true;
  } catch (_) {
    return false;
  }
}
```

Event analytics wedding yang diterima:

```text
invitation opened
RSVP clicked
map clicked
music clicked
```

Dilarang mengirim nama tamu, email, telepon, isi RSVP, isi guestbook, gift data,
atau PII lain ke analytics.

---

# 2. ARTIFACT DAN STRUKTUR DOKUMEN

## 2.1 Canonical repository artifact

Setiap template MUST berupa satu dokumen HTML lengkap:

```html
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Undangan Pernikahan</title>
  <style>
    /* satu blok CSS */
  </style>
</head>
<body style="margin:0;overflow-x:hidden">
  <main id="svwWedding" data-sve-template="nama-template">
    <!-- public wedding UI -->
  </main>
  <script>
    const CONFIG = {};
    const SVE_SCHEMA = {};
    /* satu runtime template */
  </script>
</body>
</html>
```

Wajib:

- satu `<style>` utama di `<head>`;
- satu `<script>` template di akhir `<body>`;
- vanilla JavaScript;
- tidak ada stylesheet/JS lokal terpisah;
- seluruh `<img>` memiliki `width`, `height`, dan `alt` eksplisit;
- animasi public UI mengutamakan `transform` dan `opacity`;
- tidak ada horizontal overflow.

## 2.2 Representasi Scalev

Scalev boleh memisahkan hasil import menjadi:

```text
Body HTML
CSS
JavaScript
Additional Head Code
```

Editor membaca keempat pane Scalev (Body HTML, CSS, JavaScript, Additional
Head) lewat `detectEditors`. Canonical placement setelah split adalah:

- markup di Body HTML;
- token dan style template di CSS;
- `const CONFIG`, `const SVE_SCHEMA`, dan runtime di JavaScript;
- preload/font link/metadata tambahan di Additional Head.

Parser `parseAssignedObject` juga dapat menemukan assignment di Body HTML atau
Additional Head, tetapi canonical strict placement tetap JavaScript pane.

## 2.3 Root dan CSS scoping

Root public template MUST eksplisit:

```html
<main id="svwWedding" data-sve-template="nama-template">
```

Semua class invitation memakai prefix `svw-`. Token dan base style berada pada
wrapper, bukan global `:root`:

```css
#svwWedding {
  min-height: 100dvh;
  background: var(--sve-background-primary);
  color: var(--sve-text-primary);
  font-family: var(--sve-font-body);
}

:where(#svwWedding) h1,
:where(#svwWedding) h2,
:where(#svwWedding) p {
  margin: 0;
}
```

Element-level selector memakai `:where(#svwWedding)`, bukan `#svwWedding h1`,
agar specificity class theme tetap bekerja. Global CSS hanya boleh dipakai untuk
`html { scroll-behavior }` dan reduced-motion reset pasangannya.

## 2.4 Output envelope untuk generator chat

Jika prompt Scalev meminta hasil import final, response MUST berisi tepat satu
fenced code block `html` yang memuat satu dokumen lengkap. Jangan menambahkan
penjelasan, checklist, atau CSP report sebelum/sesudah HTML.

Dalam workflow repository, simpan dokumen lengkap ke canonical template file dan
laporkan path serta hasil verifikasi seperti biasa.

Kebutuhan CSP adalah deployment gate, bukan public copy. Ketika response dibatasi
HTML-only, operator menerapkan CSP dari bagian 15.3 atau dari tab Status Visual
Editor setelah import.

---

# 3. STRICT STATIC DATA GRAMMAR

## 3.1 Canonical declaration

Template baru MUST memakai:

```js
const CONFIG = {
  "sectionOrder": [],
  "sections": {}
};

const SVE_SCHEMA = {
  "version": 1,
  "sections": []
};
```

Object canonical ditulis sebagai JSON-compatible static literal. Nilai yang
diizinkan:

- string;
- finite number;
- boolean;
- `null`;
- array;
- object literal.

Dilarang di dalam `CONFIG` dan `SVE_SCHEMA`:

- `undefined`;
- `NaN` atau `Infinity`;
- function/arrow function;
- function call atau `new`;
- spread;
- computed property;
- expression dinamis;
- template interpolation;
- duplicate key;
- key `__proto__`, `prototype`, atau `constructor`.

Parser `parseLooseObjectLiteral` masih dapat membaca `var`, `let`, unquoted
keys, single quotes, backticks tanpa interpolation, comments, dan trailing
commas. Semua itu hanya legacy migration input, bukan output canonical baru.
Setelah commit, editor dapat menormalisasi `CONFIG` menjadi serialization
JSON-style.

## 3.2 Path safety (lihat `safePathParts`)

Path hanya memakai dot notation deterministik:

```text
root.child
root.items.0.title
```

Kontrak mekanis:

- panjang maksimum 240 karakter;
- kedalaman maksimum 12 segment;
- index array `0`–`10000`;
- bukan `..`, leading dot, trailing dot, atau bracket notation;
- bukan forbidden object key;
- named segment mengikuti `[A-Za-z_$][A-Za-z0-9_$-]*`.

Stable `key` pada subfield repeater juga MUST aman sebagai satu path segment.

---

# 4. UNIVERSAL MASTER — 21 SECTION

Canonical IDs dan urutan awal:

```js
[
  "cover",
  "opening",
  "quote",
  "couple",
  "stories",
  "savedate",
  "countdown",
  "gallery",
  "videos",
  "events",
  "dress",
  "rundown",
  "rsvp",
  "live",
  "filter",
  "gifts",
  "prokes",
  "guestbook",
  "families",
  "closing",
  "footer"
]
```

Semua 21 ID MUST:

- unik di `SVE_SCHEMA.sections`;
- ada di `CONFIG.sectionOrder` tanpa duplicate;
- memiliki public runtime target;
- tetap dikenal walaupun theme menyajikan desain yang berbeda.

`cover` selalu pertama, locked, tidak dapat di-hide, dan tidak memiliki boolean
di `CONFIG.sections`.

`footer` selalu terakhir, locked, tidak dapat di-hide, tetapi tetap mempunyai
`CONFIG.sections.footer === true` karena `effectiveSchema` memaksa boolean
untuk seluruh canonical ID selain cover. Public runtime mengabaikan usaha
manual untuk mematikan atau memindahkan Footer.

## 4.1 Visibility baseline

Template baru/catalog demo MUST mulai dengan:

```js
"sections": {
  "opening": true,
  "quote": true,
  "couple": true,
  "stories": true,
  "savedate": true,
  "countdown": true,
  "gallery": true,
  "videos": true,
  "events": true,
  "dress": true,
  "rundown": true,
  "rsvp": true,
  "live": true,
  "filter": true,
  "gifts": true,
  "prokes": true,
  "guestbook": true,
  "families": true,
  "closing": true,
  "footer": true
}
```

Editor hanya memblokir visibility yang bukan boolean (lihat `effectiveSchema`).
Setelah user memakai toggle pada section yang hideable, `true` atau `false`
sama-sama valid sebagai saved customization. Footer tidak mempunyai toggle dan
tetap `true`.

## 4.2 Canonical data shape

Data berulang memakai object section + `items`, bukan root array langsung:

| Section | Canonical root |
|---|---|
| `stories` | `stories.items[]` |
| `gallery` | `gallery.items[]` |
| `videos` | `videos.items[]` |
| `events` | `events.items[]` |
| `dress` | `dress.items[]` + palette/note |
| `rundown` | `rundown.items[]` |
| `gifts` | `gifts.items[]` + confirmation |
| `prokes` | `prokes.items[]` |
| `families` | `families.items[]` |

Minimum shape penting:

```js
const CONFIG = {
  "sectionOrder": [
    "cover", "opening", "quote", "couple", "stories", "savedate",
    "countdown", "gallery", "videos", "events", "dress", "rundown",
    "rsvp", "live", "filter", "gifts", "prokes", "guestbook",
    "families", "closing", "footer"
  ],
  "sections": {
    "opening": true,
    "quote": true,
    "couple": true,
    "stories": true,
    "savedate": true,
    "countdown": true,
    "gallery": true,
    "videos": true,
    "events": true,
    "dress": true,
    "rundown": true,
    "rsvp": true,
    "live": true,
    "filter": true,
    "gifts": true,
    "prokes": true,
    "guestbook": true,
    "families": true,
    "closing": true,
    "footer": true
  },
  "invitation": {
    "guestLabel": "Kepada Yth.",
    "guestFallback": "Tamu Undangan",
    "openButtonLabel": "Buka Undangan"
  },
  "wedding": {
    "date": "2027-06-12T08:00:00+07:00",
    "hashtag": "#AlyaFajar"
  },
  "couple": {
    "bride": {
      "shortName": "Alya",
      "fullName": "Alya Maharani",
      "parents": "Putri dari Bapak dan Ibu",
      "instagram": "",
      "photo": ""
    },
    "groom": {
      "shortName": "Fajar",
      "fullName": "Fajar Pratama",
      "parents": "Putra dari Bapak dan Ibu",
      "instagram": "",
      "photo": ""
    }
  },
  "opening": { "title": "Assalamu'alaikum", "description": "Dengan penuh syukur, kami mengundang Anda untuk hadir di hari bahagia kami." },
  "quote": { "text": "", "translation": "", "source": "" },
  "stories": { "title": "Cerita Kami", "description": "", "items": [] },
  "savedate": { "title": "Simpan Tanggal", "description": "", "date": "2027-06-12T08:00:00+07:00", "calendarLabel": "Simpan Tanggal", "calendarUrl": "" },
  "countdown": { "title": "Menuju Hari Bahagia", "description": "", "daysLabel": "Hari", "hoursLabel": "Jam", "minutesLabel": "Menit", "secondsLabel": "Detik" },
  "gallery": { "title": "Galeri", "description": "", "items": [] },
  "videos": { "title": "Video", "description": "", "items": [] },
  "events": { "title": "Rangkaian Acara", "description": "", "items": [] },
  "dress": { "title": "Dress Code", "description": "", "items": [], "palette": "", "note": "" },
  "rundown": { "title": "Rundown", "description": "", "items": [] },
  "rsvp": { "title": "Konfirmasi Kehadiran", "description": "", "deadline": "", "submitLabel": "Kirim RSVP" },
  "live": { "title": "Live Streaming", "description": "", "platform": "", "url": "", "cover": "", "buttonLabel": "Tonton Live" },
  "filter": { "title": "Wedding Filter", "description": "", "preview": "", "url": "", "buttonLabel": "Gunakan Filter" },
  "gifts": { "title": "Wedding Gift", "description": "", "items": [], "confirmation": { "enabled": false } },
  "prokes": { "title": "Protokol Kesehatan", "description": "", "items": [] },
  "guestbook": {
    "enabled": true,
    "weddingId": "alya-fajar",
    "endpoint": "https://ozdonprvactdvpiirnrq.supabase.co/functions/v1/wedding-guestbook",
    "initialVisible": 10,
    "pageSize": 10,
    "title": "Ucapan dan Doa",
    "description": "Tinggalkan doa terbaik untuk kami.",
    "loadMoreLabel": "Muat Lebih Banyak"
  },
  "families": { "title": "Turut Mengundang", "description": "", "items": [] },
  "closing": { "title": "Terima Kasih", "description": "", "names": "Alya dan Fajar", "image": "" },
  "footer": {
    "designerBy": "Designed by",
    "logo": "",
    "brandName": "Nikahin",
    "creatorName": "Kreator Nikahin",
    "whatsappLabel": "Chat WhatsApp · Upgrade Undangan",
    "whatsappUrl": "https://wa.me/6282175274118",
    "note": ""
  },
  "extensions": {
    "rsvpBackend": { "mode": "none", "endpoint": "" }
  },
  "assets": {
    "coverPhoto": "",
    "coverVideo": "",
    "coverCard": "",
    "logo": "",
    "audio": ""
  },
  "imageSettings": {},
  "editorStyle": {
    "googleFonts": { "heading": "", "body": "" }
  }
};
```

Contoh di atas menunjukkan shape, bukan izin untuk mengirim frame gambar kosong.
Generator demo wajib mengganti image yang terlihat dengan asset valid sebelum
release. Data client production wajib berasal dari source/client yang terverifikasi.

## 4.3 Events harus generik

Akad, resepsi, pemberkatan, tea pai, ngunduh mantu, acara adat, dan event lain
masuk ke `events.items[]`:

```js
{
  "title": "Akad Nikah",
  "subtitle": "",
  "date": "2027-06-12",
  "startTime": "08:00",
  "endTime": "10:00",
  "venue": "Gedung Arunika Hall",
  "address": "Jl. Merpati Indah No. 27, Sukasari, Bandung, Jawa Barat 40154",
  "city": "Bandung",
  "mapsUrl": "https://maps.google.com/",
  "description": "",
  "extraInfo": ""
}
```

Jangan membuat canonical section baru hanya karena nama event berbeda.

Extension seperti analytics, transfer confirmation, share, table, atau custom
backend boleh ditambahkan setelah contract canonical terpenuhi. Extra schema ID
harus unik dan path-safe; extension tidak boleh mengganti/menghilangkan salah satu
dari 21 canonical section.

---

# 5. SVE_SCHEMA (canonical)

## 5.1 Structural spine

`SVE_SCHEMA` explicit adalah wajib. HTML fallback hanya untuk debug/migration dan
selalu menjadi blocker pada Strict Status. Saat ini canonical audio descriptor
adalah `audio`; field `music` masih dibaca sebagai legacy fallback untuk
template lama.

```js
const SVE_SCHEMA = {
  "version": 1,
  "template": { "name": "Nama Template" },
  "audio": { "label": "Audio Undangan", "path": "assets.audio" },
  "sections": [
    { "id": "cover", "label": "Cover", "reorderable": false, "locked": true, "canHide": false, "visiblePath": null, "fields": [] },
    { "id": "opening", "label": "Opening", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.opening", "fields": [] },
    { "id": "quote", "label": "Quote", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.quote", "fields": [] },
    { "id": "couple", "label": "The Couple", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.couple", "fields": [] },
    { "id": "stories", "label": "Our Story", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.stories", "fields": [] },
    { "id": "savedate", "label": "Save The Date", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.savedate", "fields": [] },
    { "id": "countdown", "label": "Countdown", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.countdown", "fields": [] },
    { "id": "gallery", "label": "Photo Gallery", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.gallery", "fields": [] },
    { "id": "videos", "label": "Video", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.videos", "fields": [] },
    { "id": "events", "label": "Wedding Events", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.events", "fields": [] },
    { "id": "dress", "label": "Dress Code", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.dress", "fields": [] },
    { "id": "rundown", "label": "Rundown", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.rundown", "fields": [] },
    { "id": "rsvp", "label": "RSVP", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.rsvp", "fields": [] },
    { "id": "live", "label": "Live Streaming", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.live", "fields": [] },
    { "id": "filter", "label": "Wedding Filter", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.filter", "fields": [] },
    { "id": "gifts", "label": "Wedding Gift", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.gifts", "fields": [] },
    { "id": "prokes", "label": "Health Protocol", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.prokes", "fields": [] },
    { "id": "guestbook", "label": "Ucapan dan Doa", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.guestbook", "fields": [] },
    { "id": "families", "label": "Turut Mengundang", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.families", "fields": [] },
    { "id": "closing", "label": "Closing", "reorderable": true, "locked": false, "canHide": true, "visiblePath": "sections.closing", "fields": [] },
    { "id": "footer", "label": "Footer", "reorderable": false, "locked": true, "canHide": false, "visiblePath": null, "fields": [] }
  ]
};
```

Structural spine ini bukan schema production lengkap. Semua public content yang
memang harus editable MUST ditambahkan sebagai `fields` pada section terkait.

Footer production memakai field contract berikut:

```js
{
  "id": "footer",
  "label": "Footer",
  "reorderable": false,
  "locked": true,
  "canHide": false,
  "visiblePath": null,
  "fields": [
    { "type": "text", "label": "Designer By", "path": "footer.designerBy" },
    { "type": "image", "label": "Logo Designer / Brand", "path": "footer.logo" },
    { "type": "text", "label": "Nama Brand", "path": "footer.brandName" },
    { "type": "text", "label": "Nama Kreator", "path": "footer.creatorName" },
    { "type": "text", "label": "Label WhatsApp", "path": "footer.whatsappLabel" },
    { "type": "url", "label": "Link WhatsApp", "path": "footer.whatsappUrl" },
    { "type": "textarea", "label": "Catatan Footer", "path": "footer.note" }
  ]
}
```

## 5.2 Canonical field types

Strict type set (`CANONICAL_FIELD_TYPES`):

```text
text
textarea
url
email
tel
number
date
time
datetime
select
boolean
image
repeater
repeater-image
```

Alias migration-compatible:

```text
datetime-local → datetime
checkbox       → boolean
```

`color` bukan strict field type. Warna template diedit melalui CSS token.

Metadata field yang dibaca editor:

```text
label
path
placeholder
help / description
default
readOnly / readonly / locked
min / max / step
maxlength / minlength / pattern
options
trueLabel / toggleLabel
```

`select.options` boleh berupa string atau object `{ value, label }`.

## 5.3 Repeater

Normal flat repeater:

```js
{
  "type": "repeater",
  "label": "Wedding Events",
  "path": "events.items",
  "itemLabelKey": "title",
  "canAdd": true,
  "canDelete": true,
  "max": 10,
  "fields": [
    { "key": "title", "type": "text", "label": "Nama Acara", "default": "Acara Pernikahan" },
    { "key": "date", "type": "date", "label": "Tanggal", "default": "" },
    { "key": "mapsUrl", "type": "url", "label": "Google Maps", "default": "" },
    { "key": "image", "type": "image", "label": "Foto Acara", "default": "" }
  ]
}
```

Canonical gallery repeater:

```js
{
  "type": "repeater-image",
  "label": "Foto Gallery",
  "path": "gallery.items",
  "canAdd": true,
  "canDelete": true,
  "max": 30,
  "fields": [
    { "key": "src", "type": "image", "label": "Foto", "default": "" },
    { "key": "alt", "type": "text", "label": "Alt Text", "default": "Foto pernikahan" }
  ]
}
```

Hard rules:

- repeater dan repeater-image selalu mempunyai `fields[]`;
- setiap subfield mempunyai stable `key`;
- nested repeater/repeater-image DILARANG;
- canonical template hanya mempunyai satu `repeater-image`;
- image subfield memakai type `image`, bukan text/url generik;
- DOM hasil render memakai indexed path yang sama dengan CONFIG.

Known limitation (lihat source): action Tambah/Reset Gallery berpusat pada
`repeater-image` pertama. Metadata non-image di dalam `repeater-image` tidak
memiliki editor Content selengkap normal repeater. Beri default `alt` yang aman,
atau gunakan normal `repeater` bila metadata per foto harus diedit penuh.

## 5.4 Wedding ID

Editor mendeteksi field Wedding ID lewat dua heuristik (`isWeddingIdField`):

```text
- path lowercased + non-alphanumeric dihapus
  dan diakhiri "weddingid"  (mis. guestbook.weddingid, weddingid)
- ATAU label mengandung "wedding id" (regex /wedding\s*id/i)
```

Field dengan path `guestbook.weddingId` adalah rekomendasi canonical; path
apapun yang lolos heuristik di atas dianggap sebagai Wedding ID field. Semua
field yang lolos diperlakukan:

- `data-auto-wedding-id="1"` otomatis dipasang di input rendering;
- `readonly` dipaksa ketika slug tersedia;
- nilai di-sinkronkan dari Scalev Slug URL lewat `syncWeddingIdToSlug` (debounce
  450ms via `syncScalevSlugDebounced`);
- bila CodeMirror belum mount (mis. user di tab Pengaturan), slug disimpan ke
  `state.pendingWeddingIdSlug` lalu di-flush saat Kode muncul.

Normalisasi slug Scalev (yang mengisi Wedding ID), urut:

- menerima raw slug atau URL penuh (di-parse via `new URL`, ambil `pathname`
  segment terakhir);
- `decodeURIComponent` dengan try/catch;
- `NFD` + hapus range combining marks `[\u0300-\u036f]`;
- `toLowerCase`;
- ganti `[^a-z0-9]+` dengan `-`;
- collapse `-+` menjadi `-`;
- trim `^-+|-+$`;
- potong ke 64 karakter pertama.

Sumber slug dibaca dari:

- input Scalev dengan `placeholder="nama-halaman"` (preferred) atau teks
  ancestor yang mengandung "slug url";
- link Scalev bertanda "saat ini" dengan hostname berakhir `.scalev.com`/
  `.scalev.id`/`scalev.com`/`scalev.id`.

Jangan mengandalkan nilai manual yang berbeda dari slug Scalev. Kalau Scalev
menyediakan endpoint deteksi slug yang lebih baru, update `readScalevSlug` —
generator/agent tidak boleh mem-bypass sinkronisasi ini.

---

# 6. DOM EDITOR CONTRACT

## 6.1 Section marker

```html
<section
  id="svwOpening"
  class="svw-section"
  data-section-id="opening"
  data-sve-section="Opening"
  data-sve-visible-path="sections.opening"
>
  ...
</section>
```

Semua section reorderable SHOULD menjadi direct child dari
`[data-sve-template]` agar perubahan order deterministik.

## 6.2 Content marker

```html
<h2
  data-sve-field="opening.title"
  data-sve-type="text"
  data-sve-label="Judul Opening"
></h2>
```

Runtime tetap merender dari `CONFIG`; marker adalah jembatan discovery/preview,
bukan pengganti schema explicit.

## 6.3 Image marker

```html
<figure data-sve-image-wrapper>
  <img
    data-sve-field="gallery.items.0.src"
    data-sve-type="image"
    data-sve-label="Foto Gallery 1"
    src="https://cdn.scalev.com/path/foto.webp"
    alt="Foto prewedding Alya dan Fajar"
    width="1200"
    height="1500"
  >
</figure>
```

Semua public image yang editable MUST memakai `data-sve-type="image"`. Repeater
image wajib menghasilkan path indexed deterministik setelah add/delete.

## 6.4 Refresh lifecycle

Template MUST menyediakan:

```js
window.SVE_REFRESH = function () {
  renderAll();
};
```

`renderAll()` minimal menyinkronkan:

- content;
- section order;
- visibility;
- repeater DOM;
- personalized guest;
- image settings;
- audio source/toggle;
- countdown tanpa interval ganda.

Lifecycle MUST idempotent. Dilarang menggandakan listener, timer, audio element,
iframe YouTube, atau DOM item setiap refresh.

---

# 7. IMAGE CONTRACT (imageSettings)

## 7.1 `CONFIG.imageSettings`

Canonical shape:

```js
"imageSettings": {
  "assets.coverPhoto": {
    "width": 100,
    "align": "center center",
    "fit": "cover",
    "ratio": "off",
    "hidden": false
  }
}
```

Enum yang benar-benar didukung editor (`imageSettings` form di panel Gambar):

```text
width  : 0–100
align  : 10 posisi object-position (lihat 7.1.1)
fit    : auto | cover | contain
ratio  : off | 16:9 | 4:3 | 1:1 | 4:5 | 9:16
hidden : boolean
```

`fit` legacy (`fill`, `fit`) di-normalize oleh `normalizeFit` ke `cover` /
`contain`; nilai lain jatuh ke `auto`. `ratio` di luar 5 rasio di atas atau
`off` akan diabaikan oleh editor UI dan disimpan apa adanya, jadi generator
JANGAN menulis rasio non-canonical.

Tidak ada `radius`, `crop`, `zoom`, atau `rotate` dalam kontrak editor.

### 7.1.1 Align position (10 nilai)

`align` editor adalah `object-position` CSS dengan 10 nilai persis (lihat
`ALIGN_POSITIONS` + `ALIGN_POSITION_CSS` di source):

```text
default       → object-position: default (no override)
center center
center left
center right
top center
top left
top right
bottom center
bottom left
bottom right
```

`default` berarti tidak ada `object-position` override; gunakan ini untuk tidak
menulis aturan alignment eksplisit. Generator yang mengirim `align` non-canonical
(`left`, `center`, `right` versi lama) akan diterima oleh `parseLooseObjectLiteral`
tetapi editor akan menampilkannya sebagai preset `default` sampai user memilih
ulang.

Visual Editor tidak membuat generated image CSS. Public runtime MUST membaca dan
menerapkan `CONFIG.imageSettings` sendiri pada setiap `SVE_REFRESH()`.

Static image delete:

```text
path image → ""
imageSettings[path].hidden → true
```

Gallery delete berarti splice item array dan remap setting indexed. Public runtime
MUST tidak merender broken `src` ketika value kosong/hidden.

## 7.2 Placeholder asset vs setting ratio

Rasio nama asset berikut adalah rasio file/target frame, bukan nilai bebas untuk
`imageSettings.ratio`:

| Asset ratio | Canonical Scalev last-holder |
|---|---|
| 21:9 | `https://cdn.scalev.com/uploads/1787306029/v4DwbQVJlUUeX_hGDtoQ8A/1787306029664-placeholder-image-21_9.webp` |
| 16:9 | `https://cdn.scalev.com/uploads/1787306025/Ia8yr50YRI4kOyHA7NRcfQ/1787306025775-placeholder-image-16_9.webp` |
| 9:16 | `https://cdn.scalev.com/uploads/1787306019/dclquLj2R8D9W9hlnUDiWQ/1787306018801-placeholder-image-9_16.webp` |
| 4:5 | `https://cdn.scalev.com/uploads/1787306013/4JmjP7ZHLG4C7fVwTcAr-w/1787306013643-placeholder-image-4_5.webp` |
| 4:3 | `https://cdn.scalev.com/uploads/1787306008/00MTEnnZMZYsQqs4O9AmCA/1787306008812-placeholder-image-4_3.webp` |
| 3:4 | `https://cdn.scalev.com/uploads/1787306004/jdz6OuS5cHBPz6S55PR2Iw/1787306004664-placeholder-image-3_4.webp` |
| 3:2 | `https://cdn.scalev.com/uploads/1787305997/swNrxB5LLIBJHL6lpeE1BQ/1787305996780-placeholder-image-3_2.webp` |
| 2:3 | `https://cdn.scalev.com/uploads/1787305992/sSPKmFej0puHV3FOB35E1A/1787305992376-placeholder-image-2_3.webp` |
| 1:1 | `https://cdn.scalev.com/uploads/1787305988/qyTLpP59LSc5vOVWHKmcVw/1787305988897-placeholder-image-1_1.webp` |

Fallback priority:

```text
1. asset user/source yang benar
2. asset editorial berizin dan sesuai konteks
3. canonical last-holder dengan rasio frame terdekat
```

Pemetaan frame → ratio setting editor (saat theme menggunakan asset dengan
rasio `21:9`, `3:2`, `5:4`, `16:10`, `3:4`, `2:3`):

```text
21:9  → ratio:"off"        (16:9 frame, biarkan theme CSS atur)
16:10 → ratio:"off"        (16:9 frame)
5:4   → ratio:"4:3"
3:2   → ratio:"4:3"        (paling dekat dari 5 UI)
3:4   → ratio:"4:5"        (paling dekat dari 5 UI)
2:3   → ratio:"4:5"        (paling dekat dari 5 UI)
```

`imageSettings.ratio` hanya menerima 5 nilai UI (`16:9`, `4:3`, `1:1`, `4:5`,
`9:16`) atau `off` (lihat `RATIO_OPTIONS` di source). Menulis rasio `4:5`,
`3:4`, `2:3`, atau `21:9` ke `imageSettings` adalah nilai non-UI: parser tidak
error, tapi editor akan menampilkannya tanpa preset sampai user reset, dan tema
tidak akan menghormati geometry frame. Gunakan `off` atau rasio terdekat, lalu
biarkan CSS theme memegang geometry.

## 7.3 Public vs editor placeholder

Copy seperti `Upload Gambar` atau `Gunakan Paste URL` hanya boleh tampil di panel
Visual Editor. Public invitation MUST NOT menampilkan instruksi editor.

---

# 8. COLOR DAN TYPOGRAPHY TOKENS (COLOR_FIELDS + TYPOGRAPHY_ROLES)

## 8.1 Sepuluh color token

Color token editor didefinisikan ulang di `COLOR_FIELDS` dengan label 4-bagian
(Category, Subcategory, CSS var, fallback). Generator HARUS memakai label yang
sama agar editor Color panel sinkron. Semua token MUST sudah ada di source
dengan fallback berikut (sama dengan default editor):

```css
#svwWedding {
  --sve-background-primary: #f7f0e8;
  --sve-background-secondary: #ffffff;
  --sve-background-tertiary: #e8ddd0;
  --sve-text-primary: #332a24;
  --sve-text-secondary: #74675f;
  --sve-text-tertiary: #a09185;
  --sve-button-primary-bg: #302820;
  --sve-button-primary-text: #ffffff;
  --sve-button-secondary-bg: #ffffff;
  --sve-button-secondary-text: #302820;
}
```

Token yang hilang tampil sebagai unset; Reset Warna tidak boleh menciptakan token
baru. Seluruh warna public utama yang ingin editable MUST memakai token ini.

## 8.2 Dua font token + 18 role token

Sumber: `TYPOGRAPHY_ROLES` (6 role × 3 atribut = 18 token) + `STYLE_FIELDS`
yang dirender ke panel Style. Default role editor:

```css
#svwWedding {
  --sve-font-heading: Georgia, "Times New Roman", serif;
  --sve-font-body: Arial, Helvetica, sans-serif;

  --sve-display-size: 56px;
  --sve-display-weight: 400;
  --sve-display-line-height: 1.0;

  --sve-heading-size: 40px;
  --sve-heading-weight: 400;
  --sve-heading-line-height: 1.2;

  --sve-subheading-size: 26px;
  --sve-subheading-weight: 500;
  --sve-subheading-line-height: 1.3;

  --sve-body-size: 16px;
  --sve-body-weight: 400;
  --sve-body-line-height: 1.5;

  --sve-small-size: 12px;
  --sve-small-weight: 500;
  --sve-small-line-height: 1.4;

  --sve-button-size: 14px;
  --sve-button-weight: 700;
  --sve-button-line-height: 1.2;
}
```

Enam role:

| Role | Pemakaian |
|---|---|
| display | nama cover, quote besar, countdown, tanggal hero |
| heading | judul section |
| subheading | nama mempelai, card/event title, footer brand |
| body | paragraph, story, description, address |
| small | kicker, meta, caption, label, source |
| button | CTA dan action link |

Missing salah satu dari 18 role token adalah BLOCKER (cek
`TYPOGRAPHY_ROLES` × `{size, weight, line-height}` di source; total 18 var
`--sve-display-size`, `…-weight`, `…-line-height`, dst.).

Size dropdown editor memakai `12px`–`72px` dengan increment `2px` (31 step,
lihat `SCALEV_FONT_SIZES` di source). Weight memakai `100`–`900`
(`SCALEV_FONT_WEIGHTS`, increment 100); line height memakai:

```text
1.0 1.2 1.5 1.6 1.8 2.0 2.4 2.8 3.0 4.0 5.0
```

Custom active value boleh dipertahankan, tetapi canonical baseline SHOULD memakai
nilai yang tersedia di control editor.

## 8.3 Font source

Editor mendukung optional Google Font melalui:

```js
"editorStyle": {
  "googleFonts": {
    "heading": "",
    "body": ""
  }
}
```

Jika dipakai, Additional Head dan CSP perlu:

```text
Style Sources: https://fonts.googleapis.com
Font Sources:  https://fonts.gstatic.com
```

Namun repository policy tetap memprioritaskan self-hosted production font dari
Supabase ketika asset/licensing tersedia. Google Fonts adalah kemampuan editor,
bukan kewajiban template. UI Visual Editor tidak boleh diwarisi font invitation
— editor memasang `--sve77-font-portal` di root portal dan
`--sve77-global-header-height` di `<html>` untuk menata chrome panel tanpa
terkena cascade font invitation.

---

# 9. PUBLIC CONTENT HARDLOCK

## 9.1 Baseline demo harus terlihat selesai

First viewport dan seluruh section default ON MUST terlihat seperti undangan yang
selesai, bukan form instruksi.

Public copy yang dilarang:

```text
Lorem ipsum
Insert text here
Replace this
Upload image
Change later
Isi ...
Masukkan ...
Ganti ...
Placeholder ...
Nama venue di sini
Alamat di sini
```

Demo boleh memakai identitas, tanggal, venue, alamat, story, rundown, dress code,
dan keluarga fiktif yang konsisten. Data harus jelas merupakan demo pada metadata
internal/catalog context dan tidak boleh diklaim sebagai fakta client.

Baseline catalog demo juga MUST:

- memberi setiap section heading/copy/CTA yang final;
- memberi list normal seperti Stories, Rundown, dan Prokes minimal tiga item;
- memberi Gallery cukup item untuk membuktikan count-aware grid;
- memberi setiap visible media frame `src` valid dan semantic `alt`;
- tidak merender repeater kosong sebagai section yang tampak rusak.

Dilarang mengarang:

- nomor rekening/e-wallet yang tampak nyata;
- nomor kartu;
- credential/token;
- ayat, terjemahan, atau religious wording yang tidak berasal dari source yang
  telah diperiksa;
- foto pasangan palsu yang dipresentasikan sebagai source client.

## 9.2 Source migration dan client production

Pada pure migration ingest:

- preserve wording/value source;
- record conflict sebagai `sourceWarnings`;
- jangan diam-diam memperbaiki tanggal, nama, rekening, peta, atau ayat.

Sebelum catalog demo, gap aman boleh diisi production-like demo data. Sebelum
client production, demo data MUST diganti/dikonfirmasi atau section dimatikan
secara eksplisit oleh user. Struktur 21 section tetap ada di schema.

## 9.3 First viewport

Cover wajib mempunyai:

- nama pasangan yang bermakna;
- tanggal/waktu;
- lokasi atau konteks acara;
- visual valid;
- guest label/name;
- CTA `Buka Undangan` bila theme memakai cover gate.

Empty first viewport adalah FAIL.

## 9.4 Immutable cover gate

Cover bukan overlay dekoratif. Sebelum user menekan `Buka Undangan`:

- scroll, touch scroll, dan overscroll public document terkunci;
- seluruh content selain Cover dibuat `inert` dan `aria-hidden="true"`;
- pointer dan keyboard focus tidak dapat masuk ke content bawah;
- forced anchor/deep-link tidak membuat content bawah usable;
- tidak ada public action `Skip/Lewati Cover`.

Hanya explicit user gesture pada `#svwOpenInvitation` atau control ekuivalen yang
membuka gate. Setelah open, runtime melepas `inert`, `aria-hidden`, pointer/touch
lock, dan scroll lock sebelum Cover berhenti menangkap pointer.

## 9.5 Canonical vinyl control

Tema wedding baru MUST memakai canonical product asset berikut sebagai icon audio:

```text
https://cdn.scalev.com/uploads/1787302284/pVC0F12HzYAjyCBjclIxUg/1787302283491-Black-vinyl-record.webp
```

```html
<button
  id="svwAudioToggle"
  type="button"
  aria-label="Putar musik"
  aria-pressed="false"
>
  <img
    class="svw-audio-vinyl"
    src="https://cdn.scalev.com/uploads/1787302284/pVC0F12HzYAjyCBjclIxUg/1787302283491-Black-vinyl-record.webp"
    alt=""
    aria-hidden="true"
    width="64"
    height="64"
  >
</button>
```

Asset vinyl adalah product control, bukan wedding content yang editable. Jangan
memberinya `data-sve-field`. CSP `img-src` wajib mengizinkan `https://cdn.scalev.com`.

## 9.6 Immutable Footer

Footer adalah mandatory designer/brand/upsell surface:

```text
reorderable:false
locked:true
canHide:false
visiblePath:null
```

Public runtime MUST:

- selalu menampilkan Footer;
- menjaga Footer sebagai section terakhir;
- mengabaikan `sections.footer:false` yang mungkin ditulis manual;
- tidak mengizinkan Footer berpindah ke tengah;
- menampilkan Designer By, logo/brand, nama kreator, dan CTA WhatsApp yang valid;
- mengizinkan value Footer diedit melalui field schema, tetapi tidak mengizinkan
  struktur Footer dihapus.

`footer.logo` adalah editable image biasa dan mengikuti Image Contract.

---

# 10. GUEST PERSONALIZATION

Public runtime membaca parameter dengan prioritas:

```text
to → dear → kepada → fallback
```

Nama tamu bukan bagian `CONFIG`. Gunakan target:

```html
<span data-sve-guest-label>Kepada Yth.</span>
<strong data-sve-guest-name>Tamu Undangan</strong>
```

Aturan:

- decode melalui `URLSearchParams`;
- normalize whitespace dan batasi panjang;
- render melalui `textContent`, bukan raw `innerHTML`;
- boleh prefill RSVP/Guestbook name;
- tidak boleh dikirim ke analytics;
- fallback tetap usable ketika query kosong/invalid.

---

# 11. SECTION ORDER, VISIBILITY, DAN GEOMETRY

## 11.1 Runtime order

`CONFIG.sectionOrder` adalah source of truth. Runtime MUST memindahkan existing
section DOM sesuai urutan array, bukan clone section baru. Cover dipaksa pertama
dan Footer dipaksa terakhir.

## 11.2 Runtime visibility

Semua hideable section membaca boolean di `CONFIG.sections`. `cover` selalu
visible. Footer membawa boolean `sections.footer` untuk gate editor, tetapi public
runtime selalu memaksa Footer visible. Visibility refresh tidak boleh kehilangan
state form/audio yang tidak perlu direset.

## 11.3 Viewport-proportional section

Gunakan minimum height, bukan fixed height:

```css
:where(#svwWedding) .svw-section--full {
  min-height: 100vh;
  min-height: 100svh;
}

:where(#svwWedding) .svw-section--half {
  min-height: 50vh;
  min-height: 50svh;
}

:where(#svwWedding) .svw-section--auto {
  min-height: 0;
  height: auto;
}
```

Prinsip:

```text
viewport height = design minimum
content height  = final authority
```

RSVP, Events, Rundown, Families, Guestbook, Gifts, dan content-heavy section harus
dapat tumbuh. Dilarang memotong content dengan fixed height + overflow hidden.

---

# 12. AUDIO RUNTIME

Canonical source:

```text
SVE_SCHEMA.audio.path → CONFIG.assets.audio
```

Legacy `SVE_SCHEMA.music` masih dibaca, tetapi template baru memakai `audio`.
Editor menerima direct audio URL atau YouTube URL. Start time disimpan di URL
melalui `t`, `start`, atau `#t`; runtime yang menawarkan start time MUST dapat
membacanya.

## 12.1 Cover/desktop behavior

- mobile dengan cover gate: play baru dicoba setelah klik `Buka Undangan`;
- desktop: autoplay best-effort, lalu fallback ke gesture pertama;
- kegagalan `play()` tidak boleh merusak halaman;
- URL kosong menyembunyikan audio toggle.

## 12.2 Pause/resume

```text
playing → pause pada posisi T
paused  → lanjut dari posisi T
ended   → boleh mulai dari configured start
URL berubah → reset source/start state
URL sama    → jangan rebuild/reset
```

Direct audio memakai instance `<audio>` yang sama. `pause()` tidak diikuti
`currentTime = 0`. Configured start diterapkan sekali per source baru.

YouTube memakai iframe yang sama dengan `enablejsapi=1` dan `playsinline=1`.
Play/pause dilakukan melalui `postMessage`; jangan mengosongkan atau mengganti
`iframe.src` hanya untuk pause.

Vinyl/control:

- `aria-pressed` dan accessible label sinkron;
- animasi pause pada sudut terakhir dan resume dari state visual yang sama;
- `SVE_REFRESH()` dengan URL sama tidak mereset playback.

---

# 13. SMART GALLERY RUNTIME

Public gallery adalah visual grid tanpa caption default di bawah setiap foto.
`alt` tetap wajib.

Kontrak:

- CSS Grid + `grid-auto-flow:dense`;
- 2 kolom mobile, 3 tablet, 4 desktop bila ruang cukup;
- layout mempertimbangkan jumlah item aktual;
- 1–4 foto mempunyai komposisi khusus;
- 5+ boleh memakai motif berulang dengan normalized tail;
- add/delete menghasilkan deterministic reflow;
- source order `gallery.items` tidak berubah;
- image `width:100%`, `height:100%`, `object-fit:cover`;
- tidak ada gap akibat intrinsic dimensions;
- tidak ada horizontal overflow.

Count contract:

```text
1      → hero frame
2      → dua frame seimbang
3      → satu emphasis + dua support
4      → 2×2 atau komposisi seimbang ekuivalen
5–8    → bento + normalized tail
9–12   → dense bento
13+    → repeating motif + normalized tail
```

`imageSettings` item gallery boleh mengatur fit/visibility, tetapi CSS grid theme
tetap memegang geometry bento agar ratio per-item tidak menghancurkan layout.

---

# 14. BACKEND CONTRACT

## 14.1 Guestbook

Jika `CONFIG.sections.guestbook === true`, editor memblokir save ketika:

- `guestbook.enabled !== true`; atau
- `guestbook.endpoint` bukan HTTPS.

Canonical endpoint project:

```text
https://ozdonprvactdvpiirnrq.supabase.co/functions/v1/wedding-guestbook
```

Public browser tidak membawa service-role/private credential.

Batch contract:

```text
initialVisible ≤ 10
pageSize       ≤ 10
setiap load    ≤ 10 komentar baru
```

Guestbook wajib mempunyai loading, empty, error, dan success state; backend
failure tidak boleh menjadi fake success. Honeypot dan validation backend tetap
dipertahankan.

## 14.2 RSVP

Editor menerima:

```js
"extensions": {
  "rsvpBackend": {
    "mode": "none",
    "endpoint": ""
  }
}
```

Mode hanya `none` atau `external`. `external` membutuhkan endpoint HTTPS. Mode
`none` pada section RSVP visible menghasilkan WARNING dan public runtime MUST
fail-closed; jangan menampilkan submit sukses palsu.

## 14.3 Gift fact safety

Nomor rekening, e-wallet, QR, penerima, dan alamat hadiah adalah factual/sensitive
data. Jangan membuat dummy yang tampak dapat ditransfer. Jika belum ada data valid,
gunakan state unavailable yang jujur atau hide action melalui user customization.

---

# 15. SECURITY, URL, DAN CSP

## 15.1 URL safety

- external public action memakai `https:`;
- `target="_blank"` selalu `rel="noopener noreferrer"`;
- jangan membuat invalid `wa.me` ketika nomor kosong;
- sanitize/validate maps, live, video, calendar, gift, dan social URL;
- dilarang `javascript:` URL.

## 15.2 XSS

Query parameter, guestbook response, imported CONFIG, dan user-entered text adalah
untrusted. Prefer `textContent` dan DOM APIs. Rich HTML hanya boleh memakai
allowlist/sanitizer yang eksplisit.

## 15.3 CSP manifest

Visual Editor memindai origin dari HTML/CSS/JS/Additional Head dan CONFIG, tetapi
hasilnya heuristic. Operator MUST memverifikasi manual:

```text
img-src     → image/placeholder hosts
media-src   → direct audio/video hosts
frame-src   → YouTube/embed hosts
connect-src → Supabase/RSVP endpoint
style-src   → optional Google Fonts stylesheet
font-src    → font hosts
script-src  → external script hanya bila benar-benar diperlukan
```

Baseline native Scalev untuk profile ini, ditambah `cdn.scalev.com` yang wajib
karena canonical last-holder dan vinyl control:

```json
{
  "connect_src": [
    "https://ozdonprvactdvpiirnrq.supabase.co"
  ],
  "img_src": [
    "https://cdn.scalev.com",
    "https://template.canva.com",
    "https://media.canva.com",
    "https://www.canva.com"
  ],
  "media_src": [],
  "font_src": [
    "https://ozdonprvactdvpiirnrq.supabase.co"
  ],
  "script_src": [],
  "style_src": [
    "https://ozdonprvactdvpiirnrq.supabase.co"
  ],
  "frame_src": [
    "https://www.youtube.com"
  ],
  "worker_src": [],
  "manifest_src": []
}
```

Jika direct audio/video dipakai, tambahkan origin asset aktual ke `media_src`.
Jika optional Google Fonts dari panel Style dipakai, tambahkan
`https://fonts.googleapis.com` ke `style_src` dan
`https://fonts.gstatic.com` ke `font_src`. Jangan menambah origin hanya karena
tercantum dalam contoh jika template final tidak memakainya.

Jangan whitelist `*`. Update `docs/SCALEV_SETUP.md` bila menambah asset domain
production baru.

---

# 16. EDITOR BEHAVIOR YANG BOLEH DIANDALKAN (capability, bukan class internal)

Template boleh mengandalkan editor menyediakan:

- route `/pages/{id}`;
- route `/pages/new?mode=html_mode`, tetapi bukan `/pages/new` mode lain;
- delayed CodeMirror discovery;
- paint-first panel opening;
- first-frame tabs Konten/Gambar/Warna/Style/Audio/Status;
- lazy Content section body;
- delegated input dan batched fast CONFIG commit;
- partial repeater refresh;
- cover pinned;
- section drag dan arrow reorder;
- image Paste URL atomic replace;
- image Delete/Setting/Advance;
- fresh-import reset baseline;
- color unset truthfulness;
- manual Google Font input;
- audio URL/start-time editing;
- pre-save compatibility validation.

Template MUST NOT bergantung pada class/id internal `sve77`, geometry panel,
implementation cache, toast copy, atau DOM Visual Editor lain. Itu bukan public
template API.

---

# 17. EXACT EDITOR BLOCKERS (validateCompleteTemplateDocument + runtime gates)

Status/save gate editor memblokir ketika salah satu kondisi berikut terjadi.
Daftar ini adalah superset dari `validateCompleteTemplateDocument` ditambah
aturan runtime dari editor:

**Structural blockers** (sudah di §0.3.1):

1. DOCTYPE case-insensitive `<!doctype html>` tidak ada.
2. `<html>`/`<head>`/`<body>`/`<title>` tidak lengkap.
3. `<html lang="id">` tidak persis `"id"`.
4. `<style>` di `<body>` (dilarang).
5. `<style>` lebih atau kurang dari 1 di `<head>`.
6. `<script>` di `<body>` lebih atau kurang dari 1, atau bukan lastElementChild
   body, atau punya atribut `src`.
7. Root `[data-sve-template]` / `<main id>` tidak terdeteksi.
8. Pola credential terdeteksi: regex
   `/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i`.

**Schema & data blockers**:

9. `CONFIG` tidak terbaca.
10. `SVE_SCHEMA` explicit tidak terbaca.
11. CONFIG tidak JSON-compatible/serializable (`undefined`, `NaN`, function, atau
    key terlarang `__proto__`/`prototype`/`constructor`).
12. Duplicate schema section ID.
13. Salah satu dari 21 canonical section hilang.
14. Duplicate ID di `CONFIG.sectionOrder`.
15. `CONFIG.sectionOrder` tidak lengkap (panjang ≠ 21 atau himpunan ≠ 21 ID).
16. Cover bukan item pertama `sectionOrder` (dari `normalizedSectionOrder`).
17. Visibility selain cover bukan boolean.
18. Cover bukan `locked:true` + `canHide:false` + `visiblePath:null` + tidak ada
    `canHide` boolean.
19. `visiblePath` atau field path unsafe (depth > 12, length > 240, segment
    `__proto__`/`prototype`/`constructor`, atau index > 10000).
20. Field type di luar canonical set (lihat §5.2).
21. Repeater/repeater-image tidak mempunyai `fields[]`.
22. Nested repeater di dalam normal repeater (subfield type `repeater` /
    `repeater-image`).
23. Subfield normal repeater tidak mempunyai stable `key`.
24. `eval()`, `new Function()`, `javascript:` URL, atau private Scalev API
    terdeteksi oleh `parseLooseObjectLiteral`.
25. Guestbook visible tetapi `enabled !== true` atau `endpoint` bukan HTTPS.
26. RSVP backend mode bukan `none|external`, atau `external` endpoint bukan HTTPS.
27. Salah satu dari 18 typography role token hilang (lihat §8.2).

**Wedding ID runtime**:

28. `weddingId` field terdeteksi (`isWeddingIdField`) tetapi nilai tidak
    sinkron dengan Slug Scalev pada saat save. Editor akan memaksa readonly
    dan melakukan `syncWeddingIdToSlug`; save tetap PASS selama slug tersedia
    saat commit,否則 blocker.

Warning yang diketahui (PASS dengan catatan):

- canonical assignment bukan `const` di JavaScript pane (legacy migration);
- RSVP visible dengan backend `none` (fail-closed, public harus hide action);
- `imageSettings.ratio` non-UI (lihat §7.1 dan §7.2) — diabaikan preset tapi
  tidak memblokir save;
- external origin audio/media/image belum ditambahkan ke CSP (lihat §15.3);
- hardcoded `font-size` di theme yang menang atas typography token.

No-blocker adalah syarat minimal save compatibility. Release PASS tetap membutuhkan
runtime/browser/Scalev QA di bagian berikut.

---

# 18. DEFINITION OF DONE

## 18.1 Static/source gate

- [ ] satu dokumen HTML lengkap dengan DOCTYPE `<!doctype html>`;
- [ ] `<html lang="id">` (bukan `en`/kosong);
- [ ] `<title>` di `<head>`;
- [ ] tepat satu `<style>` di dalam `<head>` dan nol `<style>` di body;
- [ ] tepat satu `<script>` inline di body, menjadi lastElementChild body;
- [ ] root `[data-sve-template]` eksplisit;
- [ ] CSS scoped di `#svwWedding` / `:where(#svwWedding)`, tidak merusak
  specificity;
- [ ] `const CONFIG` static JSON-compatible, tidak ada `undefined`/`NaN`/function;
- [ ] `const SVE_SCHEMA` static dan explicit, dengan `audio.path` =
    `assets.audio` (atau `music` legacy);
- [ ] 21 canonical section unik, tidak duplikat;
- [ ] `sectionOrder` lengkap 21 ID, cover pertama;
- [ ] cover `locked:true`, `canHide:false`, `visiblePath:null`;
- [ ] footer `locked:true`, `canHide:false`, `visiblePath:null`, dan di akhir
    sectionOrder;
- [ ] semua non-cover visibility boolean;
- [ ] template baru/demo baseline visibility seluruhnya `true`;
- [ ] field types, paths, dan repeater lolos `parseLooseObjectLiteral` +
    `safePathParts`;
- [ ] repeater flat (tidak ada nested repeater/repeater-image), fields/key
    stabil;
- [ ] tidak ada secret/private API, tidak ada eval/new Function/javascript:;
- [ ] JavaScript lolos syntax check;
- [ ] tidak ada blok `…` template literal pada `CONFIG`/`SVE_SCHEMA`
    (parser menolak identifier `undefined`/ekspresi dinamis).

## 18.2 Editor gate

- [ ] `validateCompleteTemplateDocument` mengembalikan `blockers:[]`;
- [ ] tab Content: edit field tersimpan ke CONFIG dengan debounce
      (`contentCommitTimer`) dan persistensi ke CodeMirror;
- [ ] tab Content: accordion per section, lazy mount ≤6 section sekaligus;
- [ ] section toggle tersimpan, cover tidak punya toggle;
- [ ] section reorder via arrow/drag tersimpan, cover selalu pertama, footer
      selalu terakhir;
- [ ] repeater add/delete tidak kehilangan data (`repeaterContentFieldCache`
      + `contentFieldCache` invalidated dengan benar);
- [ ] repeater-image Tambah/Reset Gallery berpusat pada repeater-image pertama
      (lihat §5.3 caveat);
- [ ] semua image muncul di Gambar dengan `imageSettings` (width/align/fit/
      ratio/hidden) yang valid;
- [ ] Paste URL mengganti value image secara atomik;
- [ ] static image delete dan gallery delete sinkron (splice + remap indexed);
- [ ] `imageSettings.fit` di antara `auto`/`cover`/`contain`; legacy
      `fill`/`fit` di-normalize;
- [ ] `imageSettings.ratio` di antara 5 rasio UI atau `off`;
- [ ] `imageSettings.align` di antara 10 posisi `object-position`;
- [ ] image settings preview dan public runtime ekuivalen;
- [ ] 10 color token terbaca di panel Color;
- [ ] 18 typography role token terbaca di panel Style;
- [ ] Audio URL/start time tersimpan di `assets.audio` lewat `audio.path`;
- [ ] Wedding ID terisi dari Slug URL Scalev (readonly), atau visibly
      placeholder saat slug belum tersedia;
- [ ] Save Scalev memanggil native save ketika blocker nol (tombol Visual
      Editor menyembunyikan saat panel aktif; launcher hanya untuk open).

## 18.3 Public runtime gate

- [ ] first viewport tampak selesai;
- [ ] tidak ada instructional placeholder public;
- [ ] guest `to/dear/kepada` aman (decode + normalisasi + `textContent`);
- [ ] cover benar-benar menjadi content gate bila digunakan (inert, scroll
      lock, `aria-hidden`, pointer lock);
- [ ] canonical vinyl control dipakai dan sinkron dengan audio state;
- [ ] Footer selalu visible dan terakhir;
- [ ] 21 section tersedia dan baseline demo tampil;
- [ ] order/visibility mengikuti `sectionOrder`/`sections` di CONFIG;
- [ ] `SVE_REFRESH()` idempotent (tidak menggandakan listener/timer/iframe);
- [ ] audio pause/resume mempertahankan posisi (langsung dan YouTube iframe
      dengan `postMessage`);
- [ ] gallery count-aware untuk 1–13+ item;
- [ ] guestbook maksimal 10 komentar per batch;
- [ ] backend error fail-closed (guestbook error, RSVP `none`);
- [ ] `imageSettings` diterapkan per item gallery + cover asset, dengan
      `object-position` dan `object-fit` sesuai enum;
- [ ] no broken image/URL/action;
- [ ] keyboard dan focus-visible berfungsi;
- [ ] reduced motion dihormati;
- [ ] tidak ada horizontal scroll.

## 18.4 Browser/Scalev gate

Uji minimum:

```text
mobile  375 × 812
tablet  768 × 1024
desktop 1440 × 900
```

Checklist:

- [ ] clean console (tidak ada error saat open editor + import template + save);
- [ ] fonts loaded (Google Fonts jika dipakai, atau self-hosted fallback);
- [ ] CSP tidak memblokir resource kritis (lihat §15.3);
- [ ] semua button/link bekerja (cover gate, buka undangan, save, dsb.);
- [ ] image width/height dan alt valid untuk semua `<img>` public;
- [ ] specificity spot-check class theme menang atas scoped element rule
      (`:where(#svwWedding)` zero-specificity helper);
- [ ] publish/import Scalev berhasil via `Simpan` / `Simpan & Terbitkan` di
      toolbar Scalev, dengan launcher Visual Editor berfungsi;
- [ ] personalized link, WhatsApp, maps, copy, audio, guestbook, dan RSVP
      diuji sesuai konfigurasi;
- [ ] template library publik (jika dipakai) memuat < 9s, fallback ke
      `library error` tidak membuat editor crash.

---

# MASTER RULE

```text
BUAT SATU TEMPLATE WEDDING HTML MODE YANG:

- memakai native HTML Sales Page hanya sebagai page-safe import/runtime envelope;
- tidak membuat commerce flow ketika Store Context tidak tersedia;
- mempunyai static CONFIG dan explicit SVE_SCHEMA (audio.path = assets.audio);
- mengenal 21 canonical section dengan cover selalu pertama dan footer selalu
  terakhir;
- default demo seluruh section ON dan usable;
- memakai object section + flat items[];
- memakai field type/path yang lolos aturan mekanis editor (lihat
  `CANONICAL_FIELD_TYPES`, `safePathParts` di source);
- menyediakan semua image marker dan runtime imageSettings dengan enum
  fit/ratio/align yang sesuai §7.1;
- menyediakan 10 color token dan 18 typography role token persis seperti
  di §8.1 dan §8.2;
- menjaga cover gate, audio pause/resume (langsung + YouTube), guest
  personalization, gallery count-aware, guestbook batch 10, immutable Footer,
  security, accessibility, dan CSP;
- tetap berfungsi tanpa runtime/store data Scalev (static fallback);
- tidak menampilkan instructional placeholder kepada tamu;
- tidak membawa secret, service-role, private API key, atau credential;
- menggunakan canonical vinyl control untuk audio, single `<style>` di
  `<head>`, single `<script>` inline last child `<body>`, dan `<html lang="id">`;
- Wedding ID field terdeteksi otomatis dan disinkronkan dari Slug URL Scalev;
- saat diminta sebagai output chat final, hanya mengembalikan satu fenced HTML
  valid (lulus `validateCompleteTemplateDocument`);
- lolos static check, Status editor (no blocker dari §17), browser smoke test,
  dan Scalev QA.
```

---

# 19. VERIFIKASI DOC vs SOURCE

Doc ini tidak terikat label versi. Setiap kali editor source di-bump,
jalankan prosedur ini sebelum commit perubahan source:

## 19.1 Identifiers yang dirujuk doc ini

```bash
SRC="scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js"

grep -nE "const CANONICAL_(SECTION_IDS|FIELD_TYPES)\
|const (FIT_MODES|RATIO_OPTIONS|ALIGN_POSITIONS|COLOR_FIELDS|TYPOGRAPHY_ROLES|STYLE_FIELDS|FORBIDDEN_OBJECT_KEYS)\
|const SCALEV_(FONT_SIZES|FONT_WEIGHTS|LINE_HEIGHTS)\
|const (MAX_PATH_DEPTH|MAX_PATH_LENGTH|MAX_ARRAY_INDEX)\
|function (validateCompleteTemplateDocument|safePathParts|normalizeFit|normalizeScalevSlug|isWeddingIdField)\
|const SVE_LITE_MODE" "$SRC"
```

Cross-check: setiap identifier di atas harus masih muncul di source. Kalau
hilang, doc perlu update. Kalau hanya label versi yang berubah (`@version`
metadata, `VERSION` constant, hash), doc tetap valid.

## 19.2 Doc seharusnya tidak lagi menyebut label versi dalam rule

```bash
rg -n "0\.9\.[0-9]+|0\.24\.[0-9]+" docs/STRICT-SYNC-RULE-v3.25.4-Scalev-Wedding.md
```

Setiap match harus:

- di header traceability (1 baris "Editor version terakhir terverifikasi
  (label)"), atau
- di catatan legacy parser/historis, atau
- merujuk ke identifier source (mis. "Strict type set
  (`CANONICAL_FIELD_TYPES`)"), BUKAN ke label versi.

## 19.3 Aturan main

1. **Rule** ditulis sebagai perilaku mekanis + identifier source di
   belakang (contoh: "Cover pinned pertama
   (`normalizedSectionOrder`)"). Jangan "sesuai versi X.Y".
2. **Bump label** userscript (`@version` atau `VERSION`): tidak memerlukan
   update doc. Cukup catat di commit message dan update header
   traceability.
3. **Hash**: recompute `shasum -a 256` hanya saat kontrak berubah, simpan
   di header traceability line.
