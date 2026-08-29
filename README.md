# Scalev Visual Editor

Schema-first userscript untuk Scalev HTML Mode.

## Instalasi

Pasang melalui [link production v0.24.5](https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/Scalev%20Visual%20Editor%20-%20Schema%20First%20by%20Nikahin%200.9.5.user.js) dengan Tampermonkey. Endpoint `.user.js` diperlukan agar Tampermonkey membuka halaman install/update, bukan source plaintext.

## Update

Tampermonkey membaca `@updateURL` dan `@downloadURL` dari script yang sama. Untuk merilis perubahan, naikkan nilai `@version`, commit, lalu push ke branch `main`. Pengguna cukup memasang script sekali; pembaruan berikutnya mengikuti URL raw yang sama.

## Batasan Gambar

Editor menolak gambar raster base64 (`data:image/png;base64,...`, jpeg, webp, gif, avif) di tiga titik:

- kolom URL gambar pada tab Gambar, termasuk tombol Paste URL;
- import template HTML, baik dari Library maupun upload file lokal;
- laporan Kompatibilitas — status berubah menjadi "Masalah" dan native Simpan ditahan.

Icon kecil `data:image/svg+xml` tetap diterima. Data URI apa pun yang melewati 4 KB muncul sebagai peringatan, bukan blocker.

Alur yang benar untuk desain Canva: download gambar dari Canva, upload ke hosting, lalu paste URL `https://` ke editor. Payload base64 membuat ukuran halaman melonjak, menyulitkan penggantian asset lewat Visual Editor, dan menghilangkan origin gambar dari manifest CSP.
