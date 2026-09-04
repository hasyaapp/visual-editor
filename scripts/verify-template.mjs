// Meniru validateCompleteTemplateDocument dari SVE tanpa DOM parser penuh.
// Tujuan: menangkap blocker paling sering SEBELUM import ke editor.
import fs from "node:fs";

const CANONICAL = [
  "cover","opening","quote","couple","stories","savedate","countdown","gallery",
  "videos","events","dress","rundown","rsvp","live","filter","gifts","adab",
  "families","closing","footer"
];

const FIELD_TYPES = new Set([
  "text","textarea","url","email","tel","number","date","time","datetime","color",
  "select","boolean","image","repeater","repeater-image"
]);

const path = process.argv[2];
const html = fs.readFileSync(path, "utf8");
const blockers = [];
const count = (re) => (html.match(re) || []).length;

// --- struktur dokumen ---
if (!/^\s*<!doctype\s+html\b/i.test(html)) blockers.push("DOCTYPE HTML wajib ada");
if (!/<html\s+lang="id"/i.test(html)) blockers.push('html lang wajib "id"');
if (!/<head>/i.test(html)) blockers.push("Elemen head wajib ada");
if (!/<body[\s>]/i.test(html)) blockers.push("Elemen body wajib ada");
if (!/<title>/i.test(html)) blockers.push("Title wajib ada di head");
if (!/data-sve-template=/.test(html)) blockers.push("Root data-sve-template tidak ditemukan");

const headBlock = (html.match(/<head>[\s\S]*?<\/head>/i) || [""])[0];
const bodyBlock = (html.match(/<body[\s\S]*<\/body>/i) || [""])[0];

if (count(/<style[\s>]/gi) !== 1) blockers.push("Wajib tepat satu style");
if (!/<style[\s>]/i.test(headBlock)) blockers.push("Style wajib di head");
if (/<style[\s>]/i.test(bodyBlock)) blockers.push("Style tidak boleh di body");

if (count(/<script[\s>]/gi) !== 1) blockers.push("Wajib tepat satu script");
if (!/<script[\s>]/i.test(bodyBlock)) blockers.push("Script wajib di body");
if (/<script[^>]+src=/i.test(html)) blockers.push("Script template harus inline");
if (!/<\/script>\s*<\/body>/i.test(html)) blockers.push("Script wajib elemen terakhir di body");

// --- keamanan ---
if (/\beval\s*\(|\bnew\s+Function\s*\(|javascript\s*:/i.test(html)) blockers.push("Kode berbahaya terdeteksi");
if (/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(html)) {
  blockers.push("Kemungkinan credential rahasia terdeteksi");
}
if (/src\s*=\s*["']data:image\/(png|jpe?g|webp|gif)/i.test(html)) blockers.push("Raster base64 terdeteksi");

// --- CONFIG & SVE_SCHEMA ---
const grab = (name) => {
  const at = html.search(new RegExp("(?:const|let|var)\\s+" + name + "\\s*=\\s*\\{"));
  if (at < 0) return null;
  const start = html.indexOf("{", at);
  let depth = 0, inStr = null;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) { if (c === "\\") i++; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (!depth) return html.slice(start, i + 1); }
  }
  return null;
};

let config = null, schema = null;
try { config = JSON.parse(grab("CONFIG")); } catch (e) { blockers.push("CONFIG tidak terbaca sebagai JSON: " + e.message); }
try { schema = JSON.parse(grab("SVE_SCHEMA")); } catch (e) { blockers.push("SVE_SCHEMA tidak terbaca sebagai JSON: " + e.message); }

// --- kontrak 20 section ---
if (schema) {
  const ids = (schema.sections || []).map(s => s.id);
  const unique = new Set(ids);
  if (ids.length !== unique.size) blockers.push("SVE_SCHEMA punya duplicate section id");
  CANONICAL.forEach(id => { if (!unique.has(id)) blockers.push("Canonical section hilang: " + id); });
  ids.forEach(id => { if (!CANONICAL.includes(id)) blockers.push("Section bukan canonical: " + id); });

  (schema.sections || []).forEach(section => {
    (section.fields || []).forEach(field => {
      if (!FIELD_TYPES.has(field.type)) {
        blockers.push("Field type tidak dikenal: " + field.type + " di " + section.id);
      }
      if (field.type === "repeater" || field.type === "repeater-image") {
        (field.fields || []).forEach(sub => {
          if (!sub.key) blockers.push("Repeater subfield tanpa key di " + section.id);
          if (sub.type === "repeater") blockers.push("Repeater nested dilarang di " + section.id);
        });
      }
    });
  });
}

if (config) {
  const order = Array.isArray(config.sectionOrder) ? config.sectionOrder : [];
  if (order.length !== CANONICAL.length || !CANONICAL.every(id => order.includes(id))) {
    blockers.push("CONFIG.sectionOrder belum lengkap (" + order.length + "/" + CANONICAL.length + ")");
  }
}

// --- markup section ---
CANONICAL.forEach(id => {
  if (!new RegExp('data-section-id="' + id + '"').test(html)) {
    blockers.push("Markup section hilang: " + id);
  }
});

console.log("File   : " + path);
console.log("Section: " + count(/data-section-id="/g) + "/20 di markup");
if (schema) console.log("Schema : " + (schema.sections || []).length + "/20 di SVE_SCHEMA");
console.log("");
if (!blockers.length) {
  console.log("LULUS — tidak ada blocker.");
} else {
  console.log("GAGAL — " + blockers.length + " blocker:");
  blockers.forEach(b => console.log("  - " + b));
  process.exitCode = 1;
}
