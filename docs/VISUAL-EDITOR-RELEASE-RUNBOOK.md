# Visual Editor Release Runbook

Catatan ini menjadi panduan setiap kali ada update Visual Editor.

Catatan ini bersifat lokal. Jangan commit atau push file Markdown, folder arsip,
atau file testing ke repository GitHub SVE.

> **Terverifikasi (27 Agustus 2026).** Versi terakhir yang dicatat:
> product `0.9.5`, userscript `0.24.5`, ID `sve77`. File production:
> `…0.9.5.js` + `…0.9.5.user.js`. Saat bump label (userscript
> `@version` atau `VERSION` constant), runbook ini tetap valid —
> cukup catat versi baru di header traceability dan update hash dengan
> `shasum -a 256` sebelum push.

## File production

Source canonical production:

```text
scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js
```

File userscript yang dipasang pengguna:

```text
scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.user.js
```

Kedua file production wajib memiliki isi implementasi yang sama. Perbedaan
yang diperbolehkan hanya metadata filename bila memang diperlukan.

## File testing

File testing hanya disimpan lokal, tidak boleh di-push ke GitHub:

```text
scripts/archive/visual-editor-testing/
```

Folder tersebut berisi varian testing lama untuk referensi atau rollback lokal.
Jangan arahkan URL update production ke file testing.

## Prosedur update

1. Kerjakan dan uji perubahan pada salinan testing lokal.
2. Salin perubahan yang sudah lolos ke kedua file production.
3. Naikkan versi secara konsisten pada metadata userscript dan konstanta
   `VERSION`.
4. Pastikan `@updateURL`, `@downloadURL`, `UPDATE_URL`, dan `CHECK_URL` selalu
   menunjuk ke file production `.user.js`.
5. Jalankan pemeriksaan:

   ```bash
   node --check "scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.js"
   node --check "scripts/Scalev Visual Editor - Schema First by Nikahin 0.9.5.user.js"
   git diff --check
   ```

6. Pastikan tidak ada selector atau listener lama yang tertinggal.
7. Jalankan detector Impeccable pada file yang berubah.
8. Commit dan push hanya dua file production yang relevan.

## Checklist sebelum push

- [ ] Versi `.js` dan `.user.js` sama.
- [ ] Isi implementasi `.js` dan `.user.js` sama.
- [ ] Tidak ada URL `testing` pada file production.
- [ ] File testing tetap lokal dan tidak ikut staged.
- [ ] Syntax check bersih.
- [ ] Static check dan detector selesai.
- [ ] State loading, sukses, error, dan update sudah diuji.
- [ ] Smoke test desktop, tablet, dan mobile selesai untuk perubahan UI.
- [ ] Commit hanya menyertakan dua file production.

## Aturan penting

- Jangan membuat file `final-v2`, `fix-last`, atau salinan release baru.
- Jangan menghapus file testing lokal tanpa persetujuan.
- Jangan mengubah URL production menjadi URL testing.
- Jika source dan userscript berbeda, perbaiki sinkronisasi sebelum release.
- GitHub SVE hanya boleh berisi dua file production SVE: `.js` dan `.user.js`.
- Setiap perubahan aturan release harus diperbarui di runbook Markdown lokal ini.
