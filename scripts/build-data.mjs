// Compila content/ (fonte da verdade, por idioma) para src/data/ (o que a aplicação importa).
//
//   src/data/<kind>.json                     índice PT com metadados, sem corpo
//   src/data/i18n/<locale>/<kind>.json       { slug: { title, excerpt } } para en e es
//   public/content/<locale>/<kind>/<slug>.json     { content, machine? }, pedido na página de detalhe
//   src/data/pages/<locale>.json             páginas soltas do WordPress, por idioma
//
// Uso: npm run data
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'

const CONTENT = new URL('../content/', import.meta.url)
const OUT = new URL('../src/data/', import.meta.url)
const BODIES = new URL('../public/content/', import.meta.url)
const LOCALES = ['pt', 'en', 'es']
const KINDS = ['news', 'projects', 'insights', 'events', 'jobs']

/** Páginas do WordPress que o novo site substitui por páginas próprias. */
const SKIP_PAGES = new Set(['home', 'noticias', 'built', 'equipa', 'associados', 'orgaos-sociais', 'recrutamento', 'contactos', 'digitalbuilt', 'podcast-techonbuilt'])

/** Corpo compilado; `machine` marca as traduções automáticas, para a página o dizer. */
const bodyOf = (text) => (text.source === 'machine' ? { content: text.content, machine: true } : { content: text.content })

const read = async (rel) => JSON.parse(await readFile(new URL(rel, CONTENT), 'utf8'))
async function write(rel, data, root = OUT) {
  const url = new URL(rel, root)
  await mkdir(new URL('.', url), { recursive: true })
  await writeFile(url, JSON.stringify(data) + '\n')
}

/** Textos de um idioma para uma colecção: { slug: { title, excerpt, content, source } }. */
async function texts(locale, kind) {
  const dir = new URL(`${locale}/${kind}/`, CONTENT)
  if (!existsSync(dir)) return {}
  const out = {}
  for (const f of await readdir(dir)) if (f.endsWith('.json')) out[f.slice(0, -5)] = JSON.parse(await readFile(new URL(f, dir), 'utf8'))
  return out
}

await rm(OUT, { recursive: true, force: true })
await rm(BODIES, { recursive: true, force: true })
const report = []

for (const kind of KINDS) {
  const meta = await read(`${kind}.json`)
  const pt = await texts('pt', kind)
  const index = meta
    .filter((m) => pt[m.slug])
    .map((m) => ({ ...m, title: pt[m.slug].title, excerpt: pt[m.slug].excerpt }))
    .sort((a, b) => (b.startsAt ?? b.date).localeCompare(a.startsAt ?? a.date))
  await write(`${kind}.json`, index)
  if (kind === 'news') await write('news-latest.json', index.slice(0, 6))

  for (const locale of LOCALES) {
    const t = locale === 'pt' ? pt : await texts(locale, kind)
    for (const { slug } of index) if (t[slug]) await write(`${locale}/${kind}/${slug}.json`, bodyOf(t[slug]), BODIES)
    if (locale === 'pt') continue
    const overlay = Object.fromEntries(index.filter((m) => t[m.slug]).map((m) => [m.slug, { title: t[m.slug].title, excerpt: t[m.slug].excerpt }]))
    await write(`i18n/${locale}/${kind}.json`, overlay)
    if (kind === 'news') await write(`i18n/${locale}/news-latest.json`, Object.fromEntries(index.slice(0, 6).filter((m) => overlay[m.slug]).map((m) => [m.slug, overlay[m.slug]])))
    report.push(`${kind} ${locale}: ${Object.keys(overlay).length}/${index.length}`)
  }
}

// Páginas soltas (avisos legais, prémios, formações…)
{
  const meta = await read('pages.json')
  for (const locale of LOCALES) {
    const t = await texts(locale, 'pages')
    const served = meta.filter((m) => !SKIP_PAGES.has(m.slug))
    const pages = served.filter((m) => t[m.slug]).map((m) => [m.slug, { title: t[m.slug].title, ...bodyOf(t[m.slug]) }])
    await write(`pages/${locale}.json`, Object.fromEntries(pages))
    report.push(`pages ${locale}: ${pages.length}/${served.length}`)
  }
}

// Podcast: episódios PT + títulos e descrições por idioma
{
  const meta = await read('podcast.json')
  const pt = (await read('pt/podcast.json')).episodes
  await write('podcast.json', meta.map((e) => ({ ...e, ...pt[e.number] })))
  for (const locale of ['en', 'es']) {
    const file = new URL(`${locale}/podcast.json`, CONTENT)
    const t = existsSync(file) ? JSON.parse(await readFile(file, 'utf8')) : null
    await write(`i18n/${locale}/podcast.json`, t ? { machine: t.source === 'machine', episodes: t.episodes } : { machine: false, episodes: {} })
  }
}

for (const name of ['team', 'governance', 'associates', 'areas']) await write(`${name}.json`, await read(`${name}.json`))

console.log(report.map((r) => `· ${r}`).join('\n'))
console.log('✓ src/data compilado')
