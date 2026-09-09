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
dan API `GM_*` yang digunakan adalah implementasi asli. Lihat
[bukti pengujian](audits/sve-0.26.10-tampermonkey.md).

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
v0.26.9 tersedia di [laporan verifikasi](audits/sve-0.26.9-fixes.md).
