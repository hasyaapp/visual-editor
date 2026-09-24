#!/usr/bin/env node
/**
 * Nikahin Pages Builder
 * ---------------------
 * Menggabungkan konten halaman (src/<nama>/index.html) dengan header & footer
 * master (shared/header.html, shared/footer.html) menjadi file final di
 * pages/<nama>/scalev_<nama>.html.
 *
 * Pemakaian:
 *   node build.js          # build semua halaman
 *   node build.js --check  # verifikasi file final konsisten dengan master
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SHARED_DIR = path.join(ROOT, 'shared');
const SRC_DIR = path.join(ROOT, 'src');

// Map: nama halaman → { name, out, rootId }
const PAGES = [
  { name: 'home',  out: 'home/scalev_home.html',  rootId: 'svHome' },
  { name: 'order', out: 'order/scalev_form_order.html', rootId: 'svOrder' },
  { name: 'share', out: 'share/scalev_kirim_undangan.html', rootId: 'svShareApp', head: '<script src="https://unpkg.com/lucide@latest"></script>' },
  { name: 'legal', out: 'legal/scalev_legal.html', rootId: 'svLegal' },
  { name: 'dashboard', out: 'dashboard/scalev_dashboard.html', rootId: 'svDash', appShell: true, standalone: true, stylesheet: 'dashboard.css' },
  // Founder memakai stylesheet dashboard lewat path relatif: dashboard.css men-scope
  // seluruh gayanya ke #svDash, dan halaman ini memakai id itu sebagai namespace
  // design system. Root id-nya wajib sama — verifyStructure() menuntut tepat satu
  // wrapper <div id="sv*">, jadi menyarangkan svFounder di luar svDash akan gagal.
  { name: 'founder', out: 'founder/scalev_founder.html', rootId: 'svDash', appShell: true, standalone: true, stylesheet: '../dashboard/dashboard.css' },
];

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function header() {
  return read(path.join(SHARED_DIR, 'header.html')).trim();
}
function footer() {
  return read(path.join(SHARED_DIR, 'footer.html')).trim();
}
function headerCss() {
  return read(path.join(SHARED_DIR, 'header.css')).trim();
}
function footerCss() {
  return read(path.join(SHARED_DIR, 'footer.css')).trim();
}

/**
 * Ambil isi <body> dari dokumen HTML (tanpa tag <body> itu sendiri).
 * Kalau tidak ada <body>, anggap seluruh file adalah konten.
 */
function bodyContent(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (m) return m[1].trim();
  const m2 = html.match(/<body[^>]*>([\s\S]*)$/i);
  return m2 ? m2[1].trim() : html.trim();
}

function standaloneContent(page, raw) {
  if (!page.stylesheet) return raw;
  const marker = '<link rel="stylesheet" href="./' + page.stylesheet + '" data-dashboard-style>';
  if (!raw.includes(marker)) throw new Error('Tautan stylesheet tidak ditemukan: ' + page.name);
  const css = read(path.join(SRC_DIR, page.name, page.stylesheet)).trim();
  return raw.replace(marker, () => '<style>\n' + css + '\n</style>');
}

function buildOne(page) {
  const srcPath = path.join(SRC_DIR, page.name, 'index.html');
  if (!fs.existsSync(srcPath)) {
    throw new Error('Konten tidak ditemukan: ' + srcPath);
  }
  const raw = read(srcPath);
  if (page.standalone) {
    fs.writeFileSync(path.join(ROOT, page.out), standaloneContent(page, raw));
    console.log('build  ' + page.out);
    return;
  }
  // Ambil <style> pertama (bisa di head atau body)
  const st = raw.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const style = st ? st[1].trim() : '';
  // Ambil <script> terakhir (biarkan yang lain apa adanya di body)
  const sc = [...raw.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  const script = sc.length ? sc[sc.length - 1][1].trim() : '';
  // Ambil <link> (font/dll) yang ada di konten → pindah ke head
  const links = [...raw.matchAll(/<link[^>]*>/gi)].map((m) => m[0].trim());
  const headLinks = links.join('\n');
  // Konten: buang <style> pertama, buang <script> terakhir, buang <link>, buang wrapper <div id="sv*">,
  // buang header/footer master, lalu trim
  let content = bodyContent(raw);
  if (st) content = content.replace(st[0], '');
  if (sc.length) content = content.replace(sc[sc.length - 1][0], '');
  links.forEach((l) => { content = content.split(l).join(''); });
  content = content.replace(/<div id="sv[A-Za-z]+">\s*/i, ''); // buka wrapper
  content = content.replace(/\s*<\/div>\s*$/i, '');            // tutup wrapper (di akhir)
  content = content.split(header()).join('');
  content = content.split(footer()).join('');
  content = content.trim();

  const out = [
    '<!doctype html>',
    '<html lang="id">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    page.head ? page.head : '',
    '<title>' + page.title + '</title>',
    headLinks ? headLinks + '\n' : '',
    '<style>',
    style,
    page.appShell ? '' : headerCss(),
    page.appShell ? '' : footerCss(),
    '</style>',
    '</head>',
    '<body style="margin:0">',
    '<div id="' + page.rootId + '">',
    page.appShell ? '' : header(),
    content,
    page.appShell ? '' : footer(),
    '</div>',
    '<script>',
    script,
    '</script>',
    '</body>',
    '</html>',
  ].filter(function (line) { return line !== ''; }).join('\n');
  const destPath = path.join(ROOT, page.out);
  fs.writeFileSync(destPath, out + '\n');
  console.log('build  ' + page.out);
  if (page.syncRoot) {
    const rootPath = path.join(ROOT, '..', page.syncRoot);
    fs.writeFileSync(rootPath, out + '\n');
    console.log('sync   ' + page.syncRoot + ' (root)');
  }
}

function checkOne(page) {
  const finalPath = path.join(ROOT, page.out);
  if (!fs.existsSync(finalPath)) {
    console.log('MISS   ' + page.out + ' (belum di-build)');
    return false;
  }
  const final = read(finalPath);
  if (page.standalone) {
    const ok = final === standaloneContent(page, read(path.join(SRC_DIR, page.name, 'index.html')));
    console.log((ok ? 'OK     ' : 'DRIFT  ') + page.out + ' (standalone source)');
    return ok;
  }
  if (page.appShell) {
    const ok = final.includes('id="' + page.rootId + '"');
    let syncOk = true;
    if (page.syncRoot) {
      const rootPath = path.join(ROOT, '..', page.syncRoot);
      syncOk = fs.existsSync(rootPath) && read(rootPath) === final;
    }
    const allOk = ok && syncOk;
    console.log((allOk ? 'OK     ' : 'DRIFT  ') + page.out + ' (app shell)' + (syncOk ? '' : ' [root desync]'));
    return allOk;
  }
  const okH = final.includes(header());
  const okF = final.includes(footer());
  const ok = okH && okF;
  console.log((ok ? 'OK     ' : 'DRIFT  ') + page.out + (okH ? '' : ' [header beda]') + (okF ? '' : ' [footer beda]'));
  return ok;
}

// ---- Definisi halaman (style/script/title diambil dari file konten) ----
PAGES.forEach((p) => {
  const srcPath = path.join(SRC_DIR, p.name, 'index.html');
  const raw = fs.existsSync(srcPath) ? read(srcPath) : '';
  // Ambil <style> pertama dari konten
  const st = raw.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  p.style = st ? st[1].trim() : '';
  // Ambil <script> terakhir dari konten
  const sc = [...raw.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  p.script = sc.length ? sc[sc.length - 1][1].trim() : '';
  // Title default dari <title> konten, fallback nama
  const ti = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  p.title = ti ? ti[1].trim() : p.name.charAt(0).toUpperCase() + p.name.slice(1);
});

// ---- Verifikasi struktur file final ----
function verifyStructure(page) {
  const p = path.join(ROOT, page.out);
  if (!fs.existsSync(p)) return true;
  const c = read(p);
  const issues = [];
  const wrap = (c.match(/<div id="sv[A-Za-z]+">/g) || []).length;
  const scripts = (c.match(/<script>/g) || []).length;
  if (wrap !== 1) issues.push('wrapper #sv* = ' + wrap + ' (harus 1)');
  if (scripts !== 1) issues.push('script = ' + scripts + ' (harus 1)');
  if (!page.appShell) {
    const headers = (c.match(/<header class="site-header/g) || []).length;
    const footers = (c.match(/<footer class="footer/g) || []).length;
    if (headers !== 1) issues.push('header = ' + headers + ' (harus 1)');
    if (footers !== 1) issues.push('footer = ' + footers + ' (harus 1)');
  }
  if (issues.length) {
    console.log('STRUKTUR  ' + page.out + ' -> ' + issues.join('; '));
    return false;
  }
  return true;
}

const check = process.argv.includes('--check');
const pageArg = process.argv.find(arg => arg.startsWith('--page='));
const selectedPages = pageArg ? PAGES.filter(page => page.name === pageArg.slice(7)) : PAGES;
if (!selectedPages.length) {
  console.error('Halaman tidak dikenal: ' + pageArg.slice(7));
  process.exit(1);
}
let ok = true;
for (const page of selectedPages) {
  if (check) {
    if (!checkOne(page)) ok = false;
    if (!verifyStructure(page)) ok = false;
  } else {
    try {
      buildOne(page);
      if (!verifyStructure(page)) ok = false;
    } catch (e) {
      console.error('ERROR ' + page.name + ': ' + e.message);
      ok = false;
    }
  }
}
process.exit(ok ? 0 : 1);
