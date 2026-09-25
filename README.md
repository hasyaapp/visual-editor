# Scalev Visual Editor

Userscript untuk Scalev HTML Mode. Repo ini dipakai untuk hosting update
Tampermonkey. File di sini yang ditarik saat auto-update.

## Pasang

Buka link berikut dengan Tampermonkey aktif:

**Scalev Visual Editor** (editor HTML Mode)

https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js

**Scalev Multi Upload (Reseller)** (pilih banyak foto sekaligus, cari foto lama di Media Library)

https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-multi-upload-reseller.user.js

**Scalev Multi Upload (Dev)** (sama seperti Reseller, plus salin URL CDN tiap berkas yang selesai diunggah)

https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-multi-upload-dev.user.js

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
baru saat `@version` naik. Cukup pasang sekali. Ketiga script sudah memakai
`@updateURL`, jadi tidak ada yang perlu diperbarui manual per komputer.

## Scalev Multi Upload

Menambahkan pilih-banyak pada input unggah Media Library, mengunggah berkas
satu per satu lewat jalur Scalev sendiri, lalu mencetak status di bawah tombol
Upload Image. Versi Dev juga menyalin URL CDN tiap berkas yang selesai.

Panel Media tidak punya kotak cari, dan `GET /v2/business/files` tidak menerima
parameter pencarian. Jadi kedua script mengambil daftar lewat API yang sama
memakai kredensial dari permintaan app, lalu mencetak hasilnya ke wadah daftar
bawaan Scalev dan menyembunyikan kartu yang tidak cocok.

Hasil pemindaian disimpan di `localStorage` per `b_uid`, berlaku 7 hari.
Pemuatan pertama memindai seluruh perpustakaan (satu request per halaman,
berantai lewat kursor, ±26 foto per halaman); setelah itu pencarian memakai
cache dan tidak meminta apa pun lagi. Cache bersifat lokal, jadi tiap komputer
dan tiap browser membayar pemindaian pertama sendiri, dan tidak ada yang perlu
disinkronkan. Kartu dicetak 12 dulu lalu menyusul saat daftar digulir, dengan
tombol **Muat 12 lagi** sebagai cadangan untuk keyboard.

Kredensial diambil dari permintaan Scalev tiap kali, bukan disimpan, jadi cukup
login ke bisnis yang sama. Kalau kredensial kedaluwarsa di tengah pemindaian,
script mencoba sekali lagi memakai cookie sesi; kalau tetap gagal, status
menyebut `sesi berakhir, muat ulang`.

## Pengembangan

Repo ini **hanya untuk hosting update Tampermonkey**. Isinya cuma hasil build
yang ditarik Tampermonkey saat `@version` naik.

Source (`src/editor.js`, `src/preview.js`, `src/validation.js`), skrip build
(`scripts/build.mjs`), dan tes dijalankan di mesin pengembang dan tidak
dipublikasikan di sini. Perubahan dikerjakan di sana, hasil build-nya di-push
ke repo ini.

Build menghasilkan satu file:

- `scripts/scalev-visual-editor.user.js`

Versi sebenarnya ada pada metadata `@version`. Parser JavaScript dan CSS sudah
dibundel; userscript tidak memuat dependensi parser dari jaringan saat
digunakan. Build lokal tidak menerbitkan update ke GitHub — push dilakukan
manual.
