# Tema Art 48 - Java Maroon Art — Workspace Notes

Status: visual parity **cukup mirip** (v2). 21 section wedding contract + token
Scalev **akan dipasang** di langkah selanjutnya (v2-final).

## Sumber

- URL: `https://inv.kondanganmu.id/art-48/?to=nama+tamu`
- Sample data: **Rizky Fauzi & Nur Wulandari** (dipakai apa adanya per instruksi owner)
- Stack sumber: Elementor + JetElements + JetFormBuilder + WeddingPress + KirimKit
  + DCW Adab Icon. Semua dependency itu **dibuang**, diganti native HTML/CSS/JS.

## Struktur file

```text
tema-art-48/
  source/                # mentah dari browser (Elementor/WordPress dump)
    source.html          # 7293 baris, 466 KB — sumber Elementor
    source_files/        # 169 file CSS/JS/gambar WP (banyak JS library)
    elementor-export.json# ternyata Imageye export, BUKAN Elementor JSON
  media/
    assets/              # 22 gambar wedding (rename bersih, tanpa prefix imgi_)
    decor/               # 22 MB crop dari source screenshot (referensi visual)
  build/
    v1.html              # clone pertama, CSS rekonstruksi kasar (37 KB)
    v2.html              # clone dengan font + warna presisi, dekorasi partial
  shots/
    source/              # full-page screenshot source (mobile 23 MB, desktop 7 MB)
    source/inspect/      # per-section + styles.json (font, color, rect)
    clone-v1/            # screenshot v1 untuk diff
    clone-v2/            # screenshot v2 untuk diff
  scripts/
    shoot.py             # Playwright screenshot tool (mobile + desktop)
    extract.py           # per-section + style extraction dari URL
    measure.py           # precise position measurement (rect, font, color)
    crop_source.py       # wide-band crop dekorasi dari full-page
    crop_tight.py        # tight reusable decoration strips
    extract_sections.py  # per-section image extraction
  notes.md               # file ini
```

## Iterasi visual: v1 → v2 → v3 (dan move on ke contract)

| Versi | Pendekatan | Hasil |
|---|---|---|
| **v1** | CSS rekonstruksi kasar, font default (Georgia/Arial), warna tebakan | Layout umum, tidak ada dekorasi maroon. Visual dasar. |
| **v2** | CSS rekonstruksi + **font presisi** (Pinyon Script, Aboreto, Cormorant) + **warna presisi** (`#5A0000`, `#AC3E3E`) + **Forum/Caudex** untuk WEDDING INVITATION & Kepada Yth + hashtag + button gradient + vinyl control + partial raster decor | **Visual decent**. Font dan warna match dengan sumber. Layout tidak 100% presisi tapi recognizable. |
| **v3** | Raster image cover-gate sebagai background + HTML overlay | **GAGAL**: muncul double text karena image source sudah punya teks, posisi overlay tidak match dengan posisi text di image. |

**Keputusan owner**: v2 cukup, move on ke 21 section wedding contract + token Scalev.
Visual bisa dipoles lebih lanjut di production nanti, atau owner pakai desainer manual
kalau butuh pixel-perfect.

## Font yang dipakai (semua dari Google Fonts CDN)

| Font | Penggunaan | Ukuran di sumber |
|---|---|---|
| **Pinyon Script** | Nama (Rizky & Wulan), Love Story, Our Gallery, dresscode, save the date | 34-42px |
| **Aboreto** | Label section (Groom & Bride, Akad, Resepsi, dresscode, gift) | 26-28px |
| **Cormorant Garamond** | Body, date, Kepada Yth (?), BUKA UNDANGAN | 14-18px |
| **Forum** | WEDDING INVITATION (kecil, uppercase) | 14px |
| **Caudex** | "Kepada Yth,", "nama tamu" (gate) | 14-16px |

## Warna yang diukur dari sumber

```text
--maroon:        #5A0000   rgb(90, 0, 0)     primary text + frames
--maroon-light:  #AC3E3E   rgb(172, 62, 62)  gradient stop
--cream:         #F7EFE0                    page background
--paper:         #FDF8F0                    section background
--text-dark:     #2B1A1A                    body text
--ink-faded:     #6B5A4A                    meta text
```

## Asset path

- `<img src="../media/assets/...">` relatif ke `build/v2.html` → `../media/assets/`.
- Untuk preview, buka `build/v2.html` langsung di browser (file://).
- Untuk deploy Scalev, upload `build/v2.html` + `media/assets/` ke Storage.

## Yang TIDAK di-copy (per instruksi owner atau lisensi)

- **Custom font proprietary** (reman, edensor-free, wellfare, rosehot, selle) di
  `source_files/uaf.css` — tidak dipakai untuk menghindari pelanggaran lisensi.
  Saat ini pakai Google Fonts yang persis sama dari sumber (Pinyon, Aboreto,
  Cormorant, Forum, Caudex).
- **Prokes/Adab section** (icon SVG untuk makan/rokok/pakaian/salaman/doa/sholat/
  no-camera/camera) — tidak ada di step 1 karena section ini opsional di sumber
  dan tidak diminta.
- **Wedding gift nomor rekening** — sumber hanya tampilkan logo bank BCA & BNI,
  tidak ada nomor rekening. Saat ini clone hanya tampilkan logo + nama bank.
  Owner perlu isi nomor rekening untuk production.
- **Live streaming** — tidak ada di sumber.
- **RSVP/Kehadiran** — sumber punya "Wishes" (ucapan) + ada dropdown konfirmasi
  di form wishes. Saya gabungkan ke form wishes.

## Source warnings (preserve wording)

Sesuai `STRICT-SYNC-RULE` §9.2 (preserve wording/value source, jangan koreksi
tanpa instruksi owner), beberapa hal di clone **dipertahankan apa adanya**:

- Typo alamat Akad: "Kav a blok a jalan a desa rancangmajar kecamatan baleendah"
- Typo tanggal Resepsi sebelum Akad: "Resepsi Jumat 29 September 2023, Akad Sabtu
  30 September 2023" (terbalik dari urutan kronologis)
- Dress code note: "Mohon hindari dress code putih, hitam penuh & merah mencolok"

## Langkah selanjutnya

Setelah visual cukup mirip, step berikutnya: tambah 21 section wedding contract
ke v2 (jadi v2-final atau file baru), supaya:

- 21 canonical section ada di `CONFIG.sectionOrder` + `SVE_SCHEMA.sections`
- `CONFIG.sections` boolean default ON
- 10 color token + 18 typography role token (sesuai STRICT-SYNC §8.1, §8.2)
- `imageSettings` per editable image (path indexed, width/align/fit/ratio)
- Repeater flat dengan `fields[]` dan stable `key`
- Guestbook backend mode + HTTPS endpoint
- `SVE_REFRESH()` lengkap
- Wedding ID field `guestbook.weddingId` dengan sinkronisasi slug Scalev

## Catatan teknis

- Audio `Denny-Caknan-Cundamani.mp3` di-referensikan dari URL Kondanganmu karena
  file MP3 tidak di-include di workspace (hak cipta). Untuk production, upload
  MP3 ke Supabase Storage dan ganti URL.
- Vinyl icon pakai canonical Scalev CDN
  (`cdn.scalev.com/uploads/1787302284/.../Black-vinyl-record.webp`).
- Stiker (4 sudut di cover) pakai stiker-1 s/d stiker-4 PNG dari `media/assets/`.
- Bunga pada cover pakai `bunga-qP61hl.webp`.
- Frame foto couple pakai `JAWA-COUPLE-1.png` (atas) & `JAWA-COUPLE-3.png` (bawah).
- Font `JAWA-GUNUNGAN` (gunungan wayang) dipakai sebagai ornamen di section couple.
- Playwright pakai Chromium 1208 dari
  `/Users/hasyaapp/Library/Caches/ms-playwright/chromium-1208/...` (cache existing,
  tidak perlu download).
