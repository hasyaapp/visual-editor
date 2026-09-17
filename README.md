# Scalev Visual Editor

Userscript untuk Scalev HTML Mode. Repo ini dipakai untuk hosting update
Tampermonkey. File di sini yang ditarik saat auto-update.

## Pasang

Buka link berikut dengan Tampermonkey aktif:

https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js

File `.user.js` sudah mandiri dan siap dipasang. Pengguna Tampermonkey tidak perlu
Node.js, npm, atau folder `src/`. Aktifkan izin **Allow User Scripts** pada halaman
pengaturan ekstensi Tampermonkey serta akses situs `app.scalev.com`, lalu muat
ulang editor Scalev. Izin tersebut diwajibkan oleh Tampermonkey pada Chromium
versi baru; lihat [panduan resmi](https://www.tampermonkey.net/faq.php?q=Q209).

Rilis 0.26.10 diuji melalui Tampermonkey 5.5.0 di Brave/Chromium 152 dengan
CodeMirror 5.65.21. Sembilan pemeriksaan mencakup pemasangan, edit source,
preview, cek update, Library, dan API penyimpanan/PIN di bawah CSP ketat.
Halaman Scalev dan respons layanan memakai fixture lokal; ekstensi, CodeMirror,
dan API `GM_*` yang digunakan adalah implementasi asli. Bukti pengujian
disimpan lokal di repositori kerja, tidak dipublikasikan.

## Inspect di versi 0.27.0

Fitur Inspect kini aktif di userscript produksi, tanpa parameter draft. Setelah
update, nonaktifkan SVE Draft dan buka URL editor biasa, misalnya
`https://app.scalev.com/pages/344089`. Reload penuh dan pastikan footer versi
`0.27.0`. Buka tab Kode, aktifkan tombol native **Inspect preview element**, lalu
klik teks atau foto. Sidebar kanan membuka field Konten atau Gambar terkait.

Pesan hanya diterima dari iframe preview sandbox Scalev. Pilihan yang sudah
kedaluwarsa dibatalkan dan pesan beruntun digabung. Source konflik tidak ditimpa.
Pemetaan bergantung pada penanda `srcdoc`; elemen yang berubah dinamis setelah
load belum dijamin terpetakan. Reload penuh setelah navigasi SPA ke halaman lain.

## Update

Otomatis. Tampermonkey membaca `@updateURL` dari script dan menarik versi
baru saat `@version` naik. Cukup pasang sekali.

## Pengembangan

Source yang diedit berada di `src/editor.js`, `src/validation.js`, dan
`src/preview.js`. Versi diambil dari `package.json`. Gunakan Node.js 22 atau lebih
baru, lalu jalankan:

```sh
npm ci
npm test
npm run build
npm run check
```

Build menghasilkan dua file dengan isi identik:

- `scripts/scalev-visual-editor.user.js`
- `scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js`

Nama file kedua dipertahankan untuk kompatibilitas; versi sebenarnya ada pada
metadata `@version`. Edit source di `src/`, lalu build ulang agar kedua salinan
tetap sinkron. Parser JavaScript dan CSS sudah dibundel; userscript tidak memuat
dependensi parser dari jaringan saat digunakan. Build lokal tidak menerbitkan
update ke GitHub.

Build draft tetap tersedia untuk pengujian terpisah, tetapi tidak diperlukan
untuk fitur Inspect pada produksi 0.27.0:

```sh
npm run build:draft
```

Nonaktifkan userscript produksi lama sebelum memasang
`test-results/scalev-visual-editor-draft.user.js`, lalu buka editor dengan
parameter `?sve-draft=1`. Rilis produksi sebelum gate draft dapat tetap berjalan
di URL itu dan mengambil slot panel sebelum draft. Build draft memakai nama dan
penyimpanan terpisah serta tidak memiliki `@updateURL`. ID panel sengaja sama
sebagai kunci singleton agar dua instance tidak dapat memasang panel bersamaan.
Timpa draft sebelumnya, lalu reload penuh halaman. Footer harus menampilkan
`Visual Editor Draft · v0.27.0-draft.1`; jika belum, build baru belum aktif.
Gunakan `&sve-draft=1` jika URL sudah memiliki parameter lain.

Draft mendengarkan pesan Inspect native dari iframe sandbox Scalev tanpa
melonggarkan sandbox, menyuntikkan script ke preview, atau menambahkan polling.
Pengujian mencakup pemalsuan asal pesan, ID tidak valid, pergantian preview,
navigasi, pesan beruntun, konflik edit tertunda, dan singleton panel.

Batas penggunaan: buka tab Kode terlebih dahulu agar CodeMirror tersedia.
Pemetaan hanya mengetahui penanda yang ada di `srcdoc`; penanda yang dibuat atau
diubah JavaScript setelah load belum dijamin terpetakan. Sesudah navigasi SPA ke
halaman lain atau mengganti parameter draft, reload penuh sebelum memakai Inspect.
Draft tetap mengedit source halaman yang sedang dibuka, bukan salinan data.
Uji pada duplikat halaman; jangan Simpan/Terbitkan halaman produksi untuk percobaan.

Tes browser memakai Brave lokal pada macOS jika tersedia. Browser lain dapat
ditentukan lewat `SVE_TEST_BROWSER=/path/to/browser npm test`; tanpa Brave,
pasang Chromium Playwright dengan `npx playwright install chromium`.
Semua permintaan halaman uji dicegat secara lokal.

Pengujian melalui ekstensi Tampermonkey asli:

```sh
npm run test:tampermonkey
```

Tes ini memerlukan OpenSSL dan folder ekstensi Tampermonkey yang terpasang.
Pada macOS, tes mencari ekstensi di profil Default Brave, Chrome, atau Edge.
Gunakan `SVE_TAMPERMONKEY_PATH` untuk menentukan folder lain yang berisi
`manifest.json`, dan `SVE_TEST_BROWSER` untuk memilih executable browser yang
mendukung pemuatan ekstensi lokal. Tanpa Brave, tes memakai Chromium Playwright.

Tes membuat profil browser sementara, mengaktifkan Allow User Scripts hanya
pada profil tersebut, memasang userscript melalui UI Tampermonkey, lalu
menghapus profil setelah selesai. Proxy HTTPS lokal menyediakan respons fixture
untuk request ekstensi dan menolak tujuan lain. Sertifikat sementara hanya
dipercaya oleh browser pengujian. Tes tidak mengubah profil browser pribadi atau
PIN produksi. Bukti ditulis ke `test-results/tampermonkey/`.

Validasi template sebelum impor atau push:

```sh
node scripts/verify-template.mjs path/to/template.html
```

Validator CLI, impor SVE, dan panel Status berbagi pemeriksaan sintaks,
CONFIG/schema, observer, CSS, serta atribut media. Panel Status tetap memiliki
pemeriksaan tambahan untuk kelengkapan integrasi editor. Validasi menganalisis
source tanpa menjalankan JavaScript template; pemeriksaan statis bukan simulasi
seluruh cascade CSS atau semua jalur eksekusi JavaScript.

Benchmark lokal opsional:

```sh
node scripts/benchmark-sve.mjs /path/to/userscript-sebelum-perbaikan.js
```

Hasil pengujian dan benchmark ditulis ke `test-results/`. Catatan perbaikan
per versi disimpan lokal di repositori kerja.
