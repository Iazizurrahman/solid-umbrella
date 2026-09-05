#!/usr/bin/env node
/**
 * Asset downloader — nscale.com homepage clone.
 * site-key: www-nscale-com-782295e3   page-key: root-8a5edab2
 *
 * Scrapes the live homepage for every referenced asset, drops Webflow's generated
 * responsive variants (-p-500 etc.), and writes originals into the page asset root.
 * Batched 4 at a time. Re-running skips files already on disk.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const PAGE = 'https://www.nscale.com/';
const OUT = 'public/sites/daita';

// Rive animation files are referenced only from the JS bundle, not the HTML.
const EXTRA = [
  'https://cdn.prod.website-files.com/666078e26595dfe9b1e8171f/6a6b6885cb465698dd023543_nscale-stack_v2_no-cursor.riv',
  'https://cdn.prod.website-files.com/69e759200831878be71184d8/6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv',
];

const DIR_FOR = {
  mp4: 'videos', webm: 'videos',
  riv: 'rive',
  svg: 'images', png: 'images', jpg: 'images', jpeg: 'images',
  webp: 'images', avif: 'images', gif: 'images',
  woff: 'fonts', woff2: 'fonts', ttf: 'fonts',
};

const extOf = (u) => (u.split('?')[0].match(/\.([a-z0-9]+)$/i)?.[1] || '').toLowerCase();

// Webflow emits `name-p-500.png` style variants; we only want the source image.
const isVariant = (u) => /-p-\d+\.[a-z0-9]+(\?|$)/i.test(u);

/**
 * Ten files were given clean names once the site stopped being a clone: the source
 * brand token and Webflow's CDN hash were dropped. Keyed by the CDN basename so a
 * re-run reproduces the tree the app actually references — without this map the
 * script would re-create the old names alongside the renamed files.
 * Mirrors the seven constants in src/components/sites/daita/shared/brand.ts.
 */
const RENAMED = {
  'nscale-homepage-animation-web-v4-vp9-chrome.webm': 'hero-animation-vp9-chrome.webm',
  'nscale-homepage-animation-web-v4-hevc-safari.mp4': 'hero-animation-hevc-safari.mp4',
  '6a72243af8c76e6552945a54_6a71c8fd5f921f9d8e0f5fb4_nscale-stack_v2.riv': 'platform-stack.riv',
  '6a6b6885cb465698dd023543_nscale-stack_v2_no-cursor.riv': 'platform-stack-no-cursor.riv',
  '6a722dbde41c53471bf40caa_stack-2.0-nscale-cloud-png.png': 'stack-layer-cloud.png',
  '6a722ddacc2f903fd22c5cd0_stack-2.0-nscale-metal-png.png': 'stack-layer-metal.png',
  '6a722e3924f1f0e6fac27d9f_stack-2.0-nscale-data.png': 'stack-layer-data.png',
  '6a722e5e5485394b6d893f59_stack-2.0-nscale-power-energy-png.png': 'stack-layer-power-energy.png',
  '6a7b8fa971988ad21dbcd7bc_6a69e15f1b842864f4314c0c_socials_-nscale-10-.png': 'social-card.png',
  'nscale-og.png': 'og-image.png',
};

function localName(url) {
  let base = decodeURIComponent(url.split('?')[0].split('/').pop() || 'asset');
  // Webflow prefixes a 24-char hex id; keep it short but unique.
  base = base.replace(/%20|\s+/g, '-').replace(/[^\w.-]/g, '-').replace(/-+/g, '-');
  base = base.toLowerCase();
  return RENAMED[base] ?? base;
}

async function collect() {
  const html = await (await fetch(PAGE)).text();
  const set = new Set(EXTRA);
  for (const m of html.matchAll(/\ssrc="([^"]+)"/g)) set.add(m[1]);
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g))
    for (const p of m[1].split(',')) set.add(p.trim().split(/\s+/)[0]);
  for (const m of html.matchAll(/\sposter="([^"]+)"/g)) set.add(m[1]);
  for (const m of html.matchAll(/url\((['"]?)(https?:\/\/[^)'"]+)\1\)/g)) set.add(m[2]);
  for (const m of html.matchAll(/"(https:\/\/[^"]+\.(?:mp4|webm|webp|png|jpe?g|svg|avif|woff2?|riv))"/gi))
    set.add(m[1]);

  return [...set]
    .filter((u) => /^https:/.test(u))
    .filter((u) => DIR_FOR[extOf(u)])
    .filter((u) => !isVariant(u));
}

async function download(url) {
  const dir = path.join(OUT, DIR_FOR[extOf(url)]);
  const dest = path.join(dir, localName(url));
  try {
    const st = await fs.stat(dest);
    if (st.size > 0) return { url, dest, skipped: true };
  } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error('empty body');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(dest, buf);
  return { url, dest, bytes: buf.length };
}

const urls = await collect();
console.log(`Discovered ${urls.length} original assets`);

const ok = [], failed = [];
for (let i = 0; i < urls.length; i += 4) {
  const batch = urls.slice(i, i + 4);
  const results = await Promise.allSettled(batch.map(download));
  results.forEach((r, j) => {
    if (r.status === 'fulfilled') {
      ok.push(r.value);
      const tag = r.value.skipped ? 'skip' : `${(r.value.bytes / 1024).toFixed(0)}kb`;
      console.log(`  ok   [${tag}] ${path.relative(OUT, r.value.dest)}`);
    } else {
      failed.push({ url: batch[j], err: r.reason.message });
      console.log(`  FAIL ${batch[j]} — ${r.reason.message}`);
    }
  });
}

console.log(`\nDone: ${ok.length} ok, ${failed.length} failed`);
if (failed.length) {
  console.log('Failures:');
  for (const f of failed) console.log(`  ${f.url} — ${f.err}`);
  process.exitCode = 1;
}
