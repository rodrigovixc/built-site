// Lista o que falta traduzir em content/<locale>/ e divide em lotes para tradução.
// Cada lote é uma lista de ficheiros PT de origem e de ficheiros de destino.
//
// Uso: node scripts/i18n-todo.mjs [--batches <dir>] [--size <caracteres por lote>]
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = new URL('../content/', import.meta.url).pathname
const TARGETS = ['en', 'es']
const KINDS = ['news', 'projects', 'insights', 'events', 'jobs', 'pages']
/** Páginas do WordPress que o novo site substitui por páginas próprias: não se traduzem. */
export const SKIP_PAGES = new Set(['home', 'noticias', 'built', 'equipa', 'associados', 'orgaos-sociais', 'recrutamento', 'contactos', 'digitalbuilt', 'podcast-techonbuilt'])

const args = process.argv.slice(2)
const batchDir = args.includes('--batches') ? args[args.indexOf('--batches') + 1] : null
const size = Number(args.includes('--size') ? args[args.indexOf('--size') + 1] : 60000)

const todo = []
for (const locale of TARGETS) {
  for (const kind of KINDS) {
    for (const file of await readdir(path.join(ROOT, 'pt', kind))) {
      if (kind === 'pages' && SKIP_PAGES.has(file.slice(0, -5))) continue
      const target = path.join(ROOT, locale, kind, file)
      if (existsSync(target)) continue
      const source = path.join(ROOT, 'pt', kind, file)
      todo.push({ locale, kind, source, target, chars: (await readFile(source, 'utf8')).length })
    }
  }
  if (!existsSync(path.join(ROOT, locale, 'podcast.json'))) {
    const source = path.join(ROOT, 'pt', 'podcast.json')
    todo.push({ locale, kind: 'podcast', source, target: path.join(ROOT, locale, 'podcast.json'), chars: (await readFile(source, 'utf8')).length })
  }
}

const summary = {}
for (const t of todo) summary[`${t.locale}/${t.kind}`] = (summary[`${t.locale}/${t.kind}`] ?? 0) + 1
console.log(summary)
console.log(`${todo.length} ficheiros, ${(todo.reduce((s, t) => s + t.chars, 0) / 1000).toFixed(0)} mil caracteres`)

if (batchDir) {
  // Agrupa por idioma, maiores primeiro, e enche lotes até `size` caracteres.
  const batches = []
  for (const locale of TARGETS) {
    let current = null
    for (const t of todo.filter((x) => x.locale === locale).sort((a, b) => b.chars - a.chars)) {
      if (!current || current.chars + t.chars > size) {
        current = { locale, chars: 0, files: [] }
        batches.push(current)
      }
      current.files.push({ source: t.source, target: t.target })
      current.chars += t.chars
    }
  }
  await mkdir(batchDir, { recursive: true })
  for (const [i, b] of batches.entries()) await writeFile(path.join(batchDir, `batch-${String(i + 1).padStart(2, '0')}-${b.locale}.json`), JSON.stringify(b, null, 1))
  console.log(`${batches.length} lotes em ${batchDir}`)
}
