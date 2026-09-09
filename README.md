# Scalev Visual Editor

Userscript untuk Scalev HTML Mode. Repo ini dipakai untuk hosting update
Tampermonkey — file di sini yang ditarik saat auto-update.

## Pasang

Buka link berikut dengan Tampermonkey aktif:

https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js

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
