// Recolhe o conteúdo público de builtcolab.pt para content/ (a fonte da verdade do site).
//
//   content/<kind>.json               metadados de cada item (datas, imagem, áreas…), sem texto
//   content/<locale>/<kind>/<slug>.json  { title, excerpt, content, source } por idioma
//
// PT e EN vêm do WordPress (o EN é a tradução oficial do WPML, ligada pelo hreflang de cada
// página). Os ficheiros com "source": "machine" são traduções feitas fora do WordPress
// (npm run i18n:todo) e nunca são apagados aqui; só são substituídos se aparecer a oficial.
//
// Uso: npm run scrape   (corre depois media e build-data)
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { all, BASE, API, cheerio, clean, decode, excerpt, get, listing, media, page$, pageBody, pool, terms } from './lib/wp.mjs'

const ROOT = new URL('../content/', import.meta.url)

async function save(rel, data) {
  const url = new URL(rel, ROOT)
  await mkdir(new URL('.', url), { recursive: true })
  await writeFile(url, JSON.stringify(data, null, 1) + '\n')
}

const norm = (path) => (path.replace(/\/+$/, '') || '/').replace(/^\/projectos(\/|$)/, '/projetos$1')

/** Caminho interno do novo site para um link do WordPress em português. */
const internalPath = (link) => norm(new URL(link, BASE).pathname)

// ---------------------------------------------------------------------------------------------
// 1. Itens PT e o seu par EN

const KINDS = [
  { kind: 'news', type: 'posts' },
  { kind: 'projects', type: 'projectos' },
  { kind: 'insights', type: 'insights' },
  { kind: 'events', type: 'eventos' },
  { kind: 'jobs', type: 'vaga' },
  { kind: 'pages', type: 'pages' },
]

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
/** "21 Setembro, 2026" → "2026-09-21". */
function isoDate(text) {
  const m = text?.toLowerCase().match(/(\d{1,2})\s+([a-zç]+),?\s+(\d{4})/)
  const month = m && MONTHS.indexOf(m[2])
  return m && month >= 0 ? `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}` : null
}

const collected = {}
/** Caminho da página EN no WordPress → caminho interno PT, para reescrever ligações do texto inglês. */
const enToInternal = new Map([['/en', '/']])

for (const { kind, type } of KINDS) {
  const [pt, en] = await Promise.all([all(type, 'pt-pt'), all(type, 'en')])
  const enByPath = new Map(en.map((e) => [norm(new URL(e.link).pathname), e]))

  // A página PT diz, no hreflang, qual é a sua versão inglesa (e, nos eventos, a data e o local).
  const rows = await pool(pt, 3, async (item) => {
    const hasPage = !item.link.includes('?')
    const $ = hasPage ? await page$(item.link) : null
    const enHref = $?.('link[rel="alternate"][hreflang="en"]').attr('href')
    const enItem = enHref ? enByPath.get(norm(new URL(enHref).pathname)) : undefined
    if (enHref) enToInternal.set(norm(new URL(enHref).pathname), internalPath(item.link))
    const fields = $
      ? $('.jet-listing-dynamic-field__content')
          .map((_, el) => $(el).text().trim())
          .get()
      : []
    return { item, enItem, fields }
  })
  collected[kind] = rows
  console.log(`· ${kind}: ${pt.length} PT, ${rows.filter((r) => r.enItem).length} com EN oficial`)
}

// ---------------------------------------------------------------------------------------------
// 2. Ligações internas: PT normalizadas; EN convertidas para o caminho PT equivalente

function internalize(html, locale) {
  const $ = cheerio.load(html, null, false)
  $('a[href^="/"]').each((_, a) => {
    const href = $(a).attr('href')
    if (href.startsWith('//')) return
    const [path, rest = ''] = href.split(/(?=[?#])/)
    if (locale === 'en' && /^\/en(\/|$)/.test(path)) {
      const mapped = enToInternal.get(norm(path))
      $(a).attr('href', mapped ? mapped + rest : BASE + href)
    } else {
      $(a).attr('href', norm(path) + rest)
    }
  })
  return $.html()
}

/** Grava o texto de um idioma sem estragar uma tradução automática quando não há oficial. */
async function saveText(locale, kind, slug, text) {
  await save(`${locale}/${kind}/${slug}.json`, { ...text, source: 'wordpress' })
}

// ---------------------------------------------------------------------------------------------
// 3. Metadados + textos por colecção

const body = (kind, raw) => (kind === 'pages' ? pageBody(raw) : clean(raw))

for (const { kind } of KINDS) {
  const meta = []
  for (const { item, enItem, fields } of collected[kind]) {
    const slug = decodeURIComponent(item.slug)
    const field = (label) => fields.find((t) => t.toLowerCase().startsWith(label))?.replace(/^[^:]+:\s*/, '') ?? null

    if (kind === 'pages') {
      meta.push({ id: item.id, slug, path: internalPath(item.link) })
    } else {
      const row = { id: item.id, slug, date: item.date, modified: item.modified, image: media(item) }
      if (kind === 'news') row.categories = terms(item).filter((t) => t.taxonomy === 'category').map((t) => t.name)
      if (kind === 'projects') row.areas = terms(item).filter((t) => t.taxonomy === 'sub-projecto').map((t) => t.slug).filter((s) => s !== 'all')
      if (kind === 'events') {
        row.startsAt = isoDate(field('data')) ?? item.date.slice(0, 10)
        row.location = field('local')
      }
      meta.push(row)
    }

    await saveText('pt', kind, slug, {
      title: decode(item.title?.rendered),
      excerpt: excerpt(item),
      content: internalize(body(kind, item.content?.rendered), 'pt'),
    })
    if (enItem) {
      await saveText('en', kind, slug, {
        title: decode(enItem.title?.rendered),
        excerpt: excerpt(enItem),
        content: internalize(body(kind, enItem.content?.rendered), 'en'),
      })
    }
  }
  await save(`${kind}.json`, meta)
}

// PDF do anúncio de cada vaga (só existe na página de recrutamento).
{
  const $rec = await page$('/built/recrutamento/')
  const pdfs = $rec('a[href$=".pdf"]').map((_, a) => $rec(a).attr('href')).get()
  const jobs = JSON.parse(await readFile(new URL('jobs.json', ROOT), 'utf8'))
  await save('jobs.json', jobs.map((j, i) => ({ ...j, pdf: pdfs[i] ?? null })))
}

// ---------------------------------------------------------------------------------------------
// 4. Listagens que a API não expõe

const $team = await page$('/built/equipa/')
await save(
  'team.json',
  listing($team).map(({ id, texts, links, images }) => ({
    id,
    name: texts[0],
    role: texts[1] ?? '',
    linkedin: links.find((l) => l.includes('linkedin')) ?? null,
    orcid: links.find((l) => l.includes('orcid')) ?? null,
    photo: images[0]?.src ?? null,
  })),
)

const $gov = await page$('/built/orgaos-sociais/')
const bodies = []
$gov('.elementor-widget-heading, .elementor-widget-jet-listing-grid').each((_, el) => {
  const $el = $gov(el)
  if ($el.hasClass('elementor-widget-heading')) {
    const title = $el.text().trim()
    if (title && !/promova|órgãos sociais/i.test(title)) bodies.push({ name: title, members: [] })
  } else if (bodies.length) {
    bodies.at(-1).members.push(...listing($gov, el).map(({ texts }) => ({ position: texts[0], name: texts[1], organization: texts[2] ?? '' })))
  }
})
await save('governance.json', bodies.filter((b) => b.members.length))

/** Nome legível a partir do ficheiro do logótipo (a página não tem texto alternativo). */
const logoKey = (src) =>
  decodeURIComponent(src.split('/').pop())
    .replace(/\.\w+$/, '')
    .replace(/-?e\d{9,}/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b(logo(tipo)?|rgb|cmyk|novo|tagline|principal|final|horizontal|vertical|cor|color|web|png|svg|\d{2,4}x\d{2,4}|\d+)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

const OFFICIAL = {
  bimms: 'BIMMS',
  'grupo casais': 'Grupo Casais',
  gabrielcouto: 'Gabriel Couto',
  'aca g': 'ACA Group',
  'isq med framed': 'ISQ',
  'mota engil': 'Mota-Engil',
  secil2: 'Secil',
  'teixeira duarte': 'Teixeira Duarte',
  '3drivers2': '3drivers',
  'cluster aec2': 'Cluster AEC',
  pfp: 'PFP',
  uporto: 'Universidade do Porto',
  inesctec: 'INESC TEC',
  'politecnico leiria': 'Politécnico de Leiria',
  'isel builtcolab': 'ISEL',
  'tecnico lisboa': 'Instituto Superior Técnico',
  itecons: 'Itecons',
  lnec: 'LNEC',
  um: 'Universidade do Minho',
}

const $assoc = await page$('/built/associados/')
await save(
  'associates.json',
  listing($assoc).map(({ id, images, links }) => {
    const src = images[0]?.src ?? ''
    return { id, name: OFFICIAL[logoKey(src)] ?? logoKey(src), logo: src || null, url: links.find((l) => !l.includes('builtcolab.pt')) ?? null }
  }),
)

const $pod = await page$('/podcast-techonbuilt/')
const episodes = []
$pod('h2, h3, h4').each((_, h) => {
  const title = $pod(h).text().replace(/\s+/g, ' ').trim()
  const m = title.match(/^Epis[óo]dio\s*(\d+)\s*[–-]\s*(.+)$/i)
  if (!m) return
  const widget = $pod(h).closest('.elementor-column, .e-con').first()
  const scope = widget.length ? widget : $pod(h).parent()
  const description = scope.find('p').map((_, p) => $pod(p).text().trim()).get().filter(Boolean).join('\n\n')
  const links = scope.find('a').map((_, a) => $pod(a).attr('href')).get().filter((l) => /spotify|apple|anchor|youtube|google/.test(l))
  episodes.push({ number: Number(m[1]), title: m[2].trim(), description, links })
})
episodes.sort((a, b) => b.number - a.number)
await save('podcast.json', episodes.map(({ number, links }) => ({ number, links })))
await save('pt/podcast.json', { source: 'wordpress', episodes: Object.fromEntries(episodes.map((e) => [e.number, { title: e.title, description: e.description }])) })

const areas = await get(`${API}/sub-projecto?per_page=100`)
await save('areas.json', (areas ?? []).filter((t) => t.slug !== 'all').map((t) => ({ slug: t.slug, name: decode(t.name), count: t.count })))

console.log(`✓ content/ actualizado (${existsSync(new URL('es/', ROOT)) ? 'traduções ES mantidas' : 'sem traduções ES ainda'})`)
