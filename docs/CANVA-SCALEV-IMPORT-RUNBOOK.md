# Canva → Scalev Import Runbook

Status: canonical implementation note  
Last verified: 29 Agustus 2026

Dokumen ini mencatat cara yang sudah terbukti untuk memindahkan desain Canva
yang dipublish sebagai website ke Scalev HTML Mode. Dokumen ini melengkapi
PRD dan `STRICT-SYNC-RULE-v3.25.4-Scalev-Wedding.md`; untuk konflik aturan,
instruksi owner terbaru tetap menang.

## 1. Capability yang sudah terbukti

Pipeline berikut sudah berhasil:

```text
Canva design
  ↓ publish as website
HTML / full-page export / JSON + asset folder
  ↓ inspeksi dan normalisasi asset
native HTML, CSS, vanilla JavaScript
  ↓ import Scalev HTML Mode
Scalev Visual Editor mapping
```

Bukti fixture:

```text
templates/experiments/scalev_beranda_1_clone.html
```

Fixture tersebut berhasil:

- mempertahankan komposisi visual Canva;
- memakai asset CDN Scalev dan foto sumber yang diberikan owner;
- berjalan sebagai satu dokumen HTML lengkap;
- terbaca sebagai `template.type: "custom-page"` oleh SVE;
- memiliki field teks dan satu field foto utama yang editable;
- lolos browser smoke test mobile, tablet, dan desktop.

Fixture ini adalah custom-page test, bukan template undangan pernikahan penuh.

Catatan status: keberhasilan di atas tercatat pada versi editor sebelumnya.
Validator aktif sekarang menolak schema tanpa 21 canonical section, sehingga
fixture custom-page tidak lagi dapat diimpor apa adanya. Lihat §6.1.

## 2. Sumber input yang direkomendasikan

Berikan sebanyak mungkin dari daftar berikut:

1. URL Canva yang sudah dipublish sebagai website.
2. File HTML hasil download website.
3. Folder asset hasil download.
4. Full-page JSON export bila tersedia.
5. Screenshot desktop dan mobile sebagai bukti visual.
6. URL CDN untuk asset yang harus dipertahankan.

JSON dan HTML dipakai untuk struktur/content. Screenshot dipakai untuk
verifikasi visual, bukan sebagai satu-satunya sumber requirement.

Jangan mengoreksi typo, tanggal, nama, atau content sumber pada fase parity
tanpa instruksi owner. Catat perbedaannya sebagai warning.

## 3. Output HTML Scalev

Setiap hasil import wajib berupa satu dokumen, sesuai hard structural gate
editor (`validateCompleteTemplateDocument` di source). Versi userscript
tidak penting — yang berlaku adalah aturan mekanis. Lihat
`STRICT-SYNC-RULE-v3.25.4-Scalev-Wedding.md` §0.3.1 untuk detail:

- `<!doctype html>` sampai `</html>`;
- `<html lang="id">` (bukan `en` atau kosong);
- `<title>` ada di `<head>`;
- tepat satu `<style>` di dalam `<head>`, nol `<style>` di body;
- tepat satu `<script>` inline di body, menjadi `lastElementChild` body, tanpa
  atribut `src`;
- root terdeteksi via `[data-sve-template]` atau `<main id>`;
- native HTML, CSS, dan vanilla JavaScript;
- tidak memakai WordPress, Elementor, WeddingPress, jQuery, atau private
  Scalev endpoint;
- tidak memasukkan API key, OAuth token, service-role key, secret, atau
  credential bisnis (regex detector editor melihat
  `service[-_]role|database[-_]password|private[-_]api[-_]key|secret[-_]token`,
  lihat source);
- semua gambar memiliki `src`, `alt`, `width`, dan `height` eksplisit;
- CSS page di-scope ke root wrapper;
- `body` memakai `overflow-x:hidden` secara inline.

Root custom-page menggunakan pola:

```html
<div id="svBeranda1" data-sve-template="canva-beranda-1-asset-test">
```

Untuk wedding template production, root wajib `<main id="svwWedding" …>` sesuai
STRICT-SYNC §2.3. Custom-page tetap memakai pola `<div id="…">` di atas karena
editor hanya menerima satu root dan mengabaikan `template.type` (lihat §6.1).

Selector element-level memakai `:where(#root)` agar class theme tetap dapat
mengalahkan selector scoped.

## 4. Normalisasi asset

### 4.1 Inventarisasi

Sebelum implementasi:

- daftar seluruh asset dan dimensinya;
- bedakan foto, dekorasi, frame, background, icon, logo, font, dan video;
- catat sumber dan lisensi bila diketahui;
- cek asset yang hilang atau gagal dimuat;
- cek apakah asset yang sama dipakai untuk beberapa posisi.

### 4.2 Penamaan dan deduplikasi

- hapus prefix export seperti `imgi_<nomor>_` dari nama file;
- gunakan nama berdasarkan fungsi, misalnya `bg-cover.webp`, `frame-cover.webp`,
  `orn-14.webp`;
- jangan membuat nama duplikat hanya karena file berasal dari posisi berbeda;
- satukan file yang byte-identical;
- letakkan asset dalam folder utama yang rapi dan mudah dipetakan.

### 4.3 Asset CDN

Gunakan URL CDN Scalev yang sudah diberikan atau disetujui owner. Jangan
mengganti foto client dengan gambar generatif atau placeholder tanpa izin.
Jika asset sumber tidak tersedia, gunakan placeholder resmi Scalev dan catat
sebagai fallback.

Current fixture memakai:

- ilustrasi rumah: CDN Scalev;
- frame arch: CDN Scalev;
- ornamen daun: CDN Scalev;
- ornamen bunga: CDN Scalev;
- foto utama: URL sumber yang diberikan owner.

### 4.4 Larangan gambar base64

Hasil Canva sering membawa raster image sebagai `data:image/...;base64,...`
berukuran beberapa MB. Payload seperti itu dilarang pada output Scalev:

- gambar raster wajib memakai URL `https://` dari hosting/CDN yang disetujui;
- `data:image/png|jpeg|webp|gif|avif;base64` ditolak sebagai blocker, termasuk
  di `src`, `srcset`, inline `style`, CSS `url(...)`, dan SVG `href`/`xlink:href`;
- icon kecil `data:image/svg+xml` tetap boleh; data URI apa pun di atas 4 KB
  muncul sebagai warning;
- relative asset path lokal juga tidak dianggap selesai karena Scalev hanya
  mengimpor satu file HTML, bukan folder asset;
- bila Canva hanya menyediakan payload embedded, ekstrak dan host dulu sebagai
  file, lalu ganti referensinya.

Editor menegakkan aturan ini di tiga titik: `validateCompleteTemplateDocument`
saat import, kedua compatibility report (menahan native Simpan), dan input URL
gambar pada tab Gambar termasuk tombol Paste URL. Alasannya ukuran payload,
penggantian asset yang dapat diprediksi lewat Visual Editor, dan manifest CSP
yang tetap bersih.

## 5. Aturan crop dan responsive

### 5.1 Custom Canva page

Desain Canva diperlakukan sebagai artboard tetap. Mobile bukan versi yang
diperkecil menjadi `contain`.

- artboard fixture tetap `440px`;
- mobile memusatkan artboard lalu memotong sisi kiri dan kanan sesuai lebar
  viewport;
- viewport memakai `overflow:hidden`;
- desktop dan tablet menampilkan artboard centered;
- `body` tidak boleh memiliki horizontal scroll;
- crop horizontal boleh terjadi pada batas viewport mobile;
- crop tidak boleh terjadi karena `clip-path: polygon` pada dekorasi.

Dengan demikian desain tetap mempertahankan ukuran visual Canva, sementara
device kecil hanya melihat area yang muat.

### 5.2 Aturan image umum

- jangan memakai `object-fit: cover` secara default untuk foto yang harus tetap
  utuh;
- frame/mask hanya dipakai jika memang bagian dari desain sumber;
- `imageSettings.fit` default adalah `auto`; editor menerima `auto`, `cover`,
  `contain` (legacy `fill`/`fit` di-normalize ke `cover`/`contain`,
  lihat `normalizeFit` di source);
- `imageSettings.align` default adalah `default` (no override); editor
  menerima 10 posisi `object-position` (`default`, `center center`,
  `center left`, `center right`, `top center`, `top left`, `top right`,
  `bottom center`, `bottom left`, `bottom right` — lihat `ALIGN_POSITIONS`
  di source);
- `alignPos: default` di fixture Canva lama harus ditulis ulang sebagai
  `align: default` — `alignPos` diabaikan editor;
- jika user mengganti foto melalui Visual Editor, runtime wajib menyegarkan
  `src`/`href` tanpa mengubah layout dekorasi statis secara tidak sengaja.

### 5.3 Aturan wedding template di masa berikutnya

- cover boleh full `100vh`/`100svh`;
- section lain memakai tinggi auto mengikuti content;
- gallery mempertahankan aspect ratio file dan tidak dicrop atau dimasking;
- content-heavy section tidak memakai fixed height + overflow hidden;
- `clip-path: polygon` tidak dipakai untuk membuka atau memotong dekorasi
  horizontal;
- overflow hidden hanya ditempatkan pada viewport/frame yang memang menjadi
  batas desain.

## 6. Visual Editor mapping

### 6.1 Custom page test

> **Status penting:** validator aktif (`validateCompleteTemplateDocument`) MEWAJIBKAN
> 21 canonical section dan `CONFIG.sectionOrder` lengkap tanpa memandang
> `template.type`. Fixture custom page dengan `sections: []` seperti contoh di
> bawah **akan gagal import** dengan blocker pertama berupa
> `Canonical section hilang: opening`. Contoh ini disimpan sebagai catatan
> historis, bukan target yang bisa diimpor sekarang.

Bentuk fixture custom page historis:

```js
const CONFIG = {};
const SVE_SCHEMA = {
  "version": 1,
  "template": {
    "name": "Canva Beranda 1"
  },
  "sections": []
};
```

Konsekuensi praktisnya untuk desain Canva satu halaman:

- naikkan schema menjadi 21 canonical section penuh dengan `sectionOrder`
  lengkap, atau
- terima bahwa file hanya dapat dipakai lokal dan belum bisa masuk HTML Mode
  melalui jalur import editor.

`customPageCompatibilityReport` masih melewati validasi 21 section, tetapi hanya
ketika `SVE_SCHEMA.template.type === "custom-page"`. Report itu berjalan setelah
source berada di editor, jadi tidak menolong file yang sudah ditolak di tahap
import. Selama validator belum diubah, validator adalah kontrak yang berlaku.

Field hanya diberi marker bila memang boleh diedit:

```html
<img
  data-sve-field="assets.photo"
  data-sve-type="image"
  data-sve-label="Foto Utama"
  src="..."
  alt="Foto utama"
  width="1287"
  height="1930"
>
```

Asset dekoratif yang tidak editable tidak diberi `data-sve-field`. Ini penting
agar Visual Editor tidak menampilkan frame, daun, rumah, dan bunga sebagai
content yang dapat diganti.

### 6.2 Fixture Canva Beranda 1

Field editable yang disetujui:

```text
cover.eyebrow
cover.namesLine1
cover.namesLine2
cover.dateLine1
cover.dateLine2
cover.location
footer.termsLabel
footer.privacyLabel
assets.photo
```

Dekorasi tetap static HTML asset. `CONFIG.imageSettings` hanya mempunyai:

```text
assets.photo
```

Runtime wajib menyediakan:

```js
window.SVE_REFRESH = function () {
  renderAll();
};
```

`renderAll()` harus idempotent dan menyinkronkan teks, image source, image
settings, visibility, dan behavior tanpa menggandakan listener atau DOM.

### 6.3 Wedding template penuh

Ketika fixture diubah menjadi undangan pernikahan production, gunakan strict
sync wedding contract:

- semua 21 canonical section tersedia;
- baseline section default ON;
- `cover` pertama, locked, tidak dapat di-hide;
- `footer` terakhir, locked, tidak dapat di-hide;
- semua teks public yang editable memiliki path schema;
- semua image editable memiliki marker dan `imageSettings`;
- field path aman dan JSON-compatible;
- repeater flat dengan `fields[]` dan stable `key`;
- typography role token lengkap.

Custom-page test tidak boleh dijadikan alasan untuk mengurangi kontrak wedding
production.

## 7. Typography dan style

Setiap template yang ingin dikontrol SVE menyediakan token:

- 10 color token `--sve-*`;
- 18 typography role token untuk display, heading, subheading, body, small,
  dan button;
- `--sve-font-heading` dan `--sve-font-body`;
- CSS editorial memakai token, bukan hardcode yang memutus preview editor.

Font dengan Google Fonts tetap didukung editor (`editorStyle.googleFonts`)
dan origin-nya wajib diizinkan CSP: `fonts.googleapis.com` untuk stylesheet
dan `fonts.gstatic.com` untuk file font. Gunakan font set yang kecil agar
request dan waktu muat tetap rendah. Untuk production template, repository
policy memprioritaskan self-hosted font dari Supabase ketika asset/licensing
tersedia; Google Fonts adalah kemampuan editor, bukan kewajiban.

## 8. Keputusan owner untuk template wedding berikutnya

Aturan berikut berasal dari revisi owner sebelumnya dan menjadi default desain,
kecuali brief template baru menyatakan sebaliknya:

1. Semua 21 section default ON.
2. Semua teks dan typography harus termapping ke Visual Editor.
3. Tombol buka undangan membuka gate lalu scroll ke content pertama.
4. Cover boleh full viewport; section lain fit content dan tidak menyisakan
   ruang kosong berlebihan.
5. Default alignment section adalah center-center; paragraf panjang boleh
   left-aligned demi keterbacaan.
6. Gallery mempertahankan aspect ratio asli tanpa frame masking atau crop.
7. Video mengikuti rasio preview dari link/platform, bukan dipaksa 1:1.
8. Batas RSVP adalah teks informasi, bukan input yang diisi tamu.
9. Live streaming mengikuti platform/link dan thumbnail-nya memakai border
   yang sesuai tema.
10. Protokol kesehatan memakai image custom, bukan icon simbol bawaan.
11. Wedding gift harus berisi dummy realistis untuk menguji seluruh field,
    termasuk bank/e-wallet, nama penerima, dan nomor tujuan.
12. Vinyl/audio control berada di kanan bawah; tombol panah berada vertikal di
    atas player dan ukurannya minimalis.
13. Dekorasi horizontal tidak boleh terpotong oleh `clip-path: polygon`.
14. Perbedaan crop yang memang merupakan batas section atau viewport harus
    tetap dibedakan dari crop asset yang tidak disengaja.

## 9. CSP inventory

Setiap template menghasilkan daftar origin yang harus dicek di Scalev. Baseline
`img-src` editor sudah termasuk `cdn.scalev.com` (vinyl control + canonical
last-holder placeholder) dan Canva hosts:

```text
Image Sources:
https://cdn.scalev.com          # baseline editor
https://template.canva.com      # baseline editor
https://media.canva.com         # baseline editor
https://www.canva.com           # baseline editor
https://images.unsplash.com     # hanya jika foto sumber ini dipakai; bukan baseline

Style Sources:
https://fonts.googleapis.com    # hanya jika Google Fonts dipakai; bukan baseline

Font Sources:
https://fonts.gstatic.com       # hanya jika Google Fonts dipakai; bukan baseline
https://ozdonprvactdvpiirnrq.supabase.co   # self-hosted production font
```

Origin production harus diminimalkan dan tidak boleh di-whitelist dengan `*`.
Lihat `STRICT-SYNC-RULE-v3.25.4-Scalev-Wedding.md` §15.3 untuk baseline CSP
manifest lengkap.

## 10. Definition of done

### Static

- full HTML valid;
- satu style dan satu script;
- `CONFIG` dan `SVE_SCHEMA` terbaca sebagai static object;
- schema field dan path aman;
- tidak ada secret/private API;
- tidak ada raster image base64; semua gambar memakai URL `https://`;
- tidak ada dead marker atau image path yang tidak terdaftar;
- `SVE_REFRESH` tersedia.

### Browser

Uji minimal:

```text
390 × 844
768 × 1024
1440 × 900
```

Checklist:

- tidak ada horizontal scroll;
- desain mobile terpotong horizontal sesuai artboard, bukan mengecil menjadi
  contain;
- semua resource kritis termuat;
- font loaded;
- console bersih;
- tombol/link bekerja;
- refresh tidak menggandakan DOM/listener;
- image editable hanya yang diizinkan schema.

### Scalev

- import berhasil;
- SVE membaca section dan field yang dimaksud;
- image replacement menyimpan path yang benar;
- typography/style dapat diedit bila token tersedia;
- CSP tidak memblokir resource kritis;
- schema memenuhi 21 canonical section dan `sectionOrder` lengkap, sesuai
  validator aktif.
