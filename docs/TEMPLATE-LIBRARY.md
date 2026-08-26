# Template Library

Template Library adalah panel provider pada userscript Visual Editor. Panel ini
membaca folder template dari Supabase Storage, lalu tombol **Gunakan template**
menyerahkan satu dokumen HTML lengkap ke input native **Upload File** Scalev.

## Setup Supabase

1. Jalankan migration `supabase/migrations/20260825000000_template_library.sql`.
2. Deploy function `supabase/functions/template-library/index.ts` sebagai
   `template-library`.
3. Upload template ke bucket privat `nikahin-template`.

Jika Supabase CLI sudah terautentikasi:

```sh
supabase link --project-ref ozdonprvactdvpiirnrq
supabase db push
supabase functions deploy template-library
```

Atur `SUPABASE_SERVICE_ROLE_KEY` sebagai secret function melalui dashboard atau
CLI secret manager, bukan di file source.

Storage hanya menyimpan source HTML. Harga, komisi, status publish, dan urutan
katalog tidak boleh disimpan sebagai teks di folder atau HTML. Metadata tersebut
akan dibaca dari registry katalog Supabase yang menjadi satu sumber harga untuk
Library, katalog, checkout, dan laporan kreator.

Registry dummy sekarang sudah aktif melalui migration
`20260825010000_template_catalog_pricing.sql`. Function tidak lagi memakai
fallback harga di kode; template hanya ditampilkan jika memiliki row aktif di
registry database. Contoh data katalog yang aktif:

```text
slug: modern-estetik
name: Modern Estetik
price_idr: 150000
commission_rate: 60
```

Dengan data tersebut komisi dummy adalah Rp90.000. Perubahan harga tidak
memerlukan upload ulang HTML:

```text
template_catalog.price_idr = 150000
```

`template_catalog` adalah tabel internal untuk Edge Function, bukan endpoint
Data API publik. RLS tetap aktif dan privilege `anon`/`authenticated` dicabut
melalui migration `harden_template_catalog`; jangan menambahkan policy publik
atau grant tulis ke tabel ini. Jika suatu hari katalog perlu dibaca langsung
dari browser, buat policy `SELECT` yang eksplisit dan tetap cabut `INSERT`,
`UPDATE`, `DELETE`, dan `TRUNCATE`.

Source template tetap dibuat satu folder per template dan memasukkan
`index.html`:

```text
nikahin-template/modern-estetik/index.html
```

Format versi opsional juga didukung:

```text
nikahin-template/modern-estetik/1.0.0/index.html
```

Nama kartu Library dibuat otomatis dari nama folder. Format lowercase kebab-case
disarankan, misalnya `modern-estetik` atau `traditional-elegant`, tetapi nama
folder biasa juga akan diubah menjadi id yang aman secara otomatis.

Bucket `nikahin-template` harus tetap private. Untuk upload admin, gunakan
`text/html` dengan batas 1 MB per file. Jangan menaruh file HTML duplikat di
root bucket; gunakan satu folder canonical per template, misalnya
`modern-estetik/index.html`.

## Migration sync sebelum perubahan berikutnya

History migration lokal dan production saat ini belum seluruhnya memakai
timestamp yang sama. Sebelum menjalankan `supabase db push`, cocokkan dulu
migration template lokal dengan history remote menggunakan:

```sh
npx supabase migration list --linked
```

Jangan menjalankan `db push` sampai tidak ada migration `local-only` atau
`remote-only` yang belum diverifikasi. Ini mencegah migration bucket atau
`template_catalog` dicoba ulang di production.

Saat transaksi mulai aktif, harga dan komisi harus disalin ke snapshot order
agar perubahan harga berikutnya tidak mengubah riwayat transaksi lama.

File sumber lokalnya adalah:

```text
templates/experiments/scalev_modern_estetik.html
```

Function memakai `SUPABASE_SERVICE_ROLE_KEY` hanya di server untuk membaca
folder bucket dan membuat signed URL lima menit. Key tersebut tidak boleh masuk
ke userscript, HTML, atau repository.

## Alur import

Panel membaca daftar folder dan mencari `index.html`, mengunduh satu dokumen
HTML lengkap, memvalidasi format Scalev (`<!doctype html>`, `<head>`, satu
`<style>`, satu `<script>` inline terakhir di `<body>`, dan `lang="id"`), lalu
menyerahkannya ke input native **Upload File** Scalev. Scalev sendiri yang
memisahkan dan mengisi pane Body HTML, CSS, JavaScript, dan Additional Head
Code. Setelah import, Visual Editor memanggil `SVE_REFRESH()`.

Import terakhir dapat diurungkan dari panel Library sebelum perubahan lain
ditimpa.

## CSP / Scalev

Origin `https://ozdonprvactdvpiirnrq.supabase.co` harus diizinkan pada
Connect Sources. Source template memang akan terbaca di browser setelah
diimpor, sesuai workflow Upload File native Scalev; private bucket hanya
melindungi file sebelum signed URL diberikan.
