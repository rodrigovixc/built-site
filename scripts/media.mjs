// Descarrega as imagens do WordPress referidas em content/ para public/media/ e reescreve
// os endereços. Cada imagem raster fica em WebP em dois tamanhos:
//   /media/2026/08/foto.webp      até 1600 px (páginas de detalhe)
//   /media/2026/08/foto-sm.webp   até 800 px  (cartões)
// Os SVG ficam como estão. Ficheiros já descarregados não se repetem.
//
// Uso: npm run media
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { download, pool } from './lib/wp.mjs'

const CONTENT = new URL('../content/', import.meta.url).pathname
const PUBLIC = new URL('../public/', import.meta.url).pathname
const IMAGE = /https?:\/\/builtcolab\.pt\/wp-content\/uploads\/[^"'\s)\\]+?\.(?:jpe?g|png|gif|webp|svg)/gi

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map((e) => (e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)])))).flat()
}

/** https://builtcolab.pt/wp-content/uploads/2026/08/Foto-Final.png → /media/2026/08/foto-final.webp */
function localPath(url) {
  const rel = decodeURIComponent(new URL(url).pathname.replace('/wp-content/uploads/', ''))
  const dir = path.dirname(rel)
  const ext = path.extname(rel).toLowerCase()
  const name = path
    .basename(rel, path.extname(rel))
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
  return `/media/${dir}/${name}${ext === '.svg' ? '.svg' : '.webp'}`
}

const jsonFiles = (await files(CONTENT)).filter((f) => f.endsWith('.json'))
const urls = new Set()
for (const f of jsonFiles) for (const m of (await readFile(f, 'utf8')).matchAll(IMAGE)) urls.add(m[0])
console.log(`· ${urls.size} imagens referidas`)

const failed = new Set()
let fresh = 0
await pool([...urls], 3, async (url) => {
  const target = localPath(url)
  const full = path.join(PUBLIC, target)
  if (existsSync(full)) return
  const buffer = await download(url).catch(() => null)
  if (!buffer) {
    failed.add(url)
    return
  }
  await mkdir(path.dirname(full), { recursive: true })
  try {
    if (target.endsWith('.svg')) {
      await writeFile(full, buffer)
    } else {
      const input = () => sharp(buffer, { animated: url.toLowerCase().endsWith('.gif') }).rotate()
      await input().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(full)
      await input().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 74 }).toFile(full.replace(/\.webp$/, '-sm.webp'))
    }
    fresh++
  } catch {
    failed.add(url)
  }
})
console.log(`· ${fresh} novas, ${failed.size} falharam`)

// Reescreve content/ para os caminhos locais (as que falharam ficam com o endereço original).
for (const f of jsonFiles) {
  const text = await readFile(f, 'utf8')
  const next = text.replace(IMAGE, (url) => (failed.has(url) ? url : localPath(url)))
  if (next !== text) await writeFile(f, next)
}
if (failed.size) console.log([...failed].map((u) => `  ✗ ${u}`).join('\n'))
console.log('✓ media')
