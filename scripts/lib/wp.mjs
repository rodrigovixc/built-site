// Acesso ao WordPress de builtcolab.pt: API REST, páginas HTML e limpeza do conteúdo.
import * as cheerio from 'cheerio'

export const BASE = 'https://builtcolab.pt'
export const API = `${BASE}/wp-json/wp/v2`

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Pedido com novas tentativas e espera crescente; o alojamento bloqueia rajadas. */
export async function get(url, as = 'json') {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'builtcolab-redesign-scraper' }, signal: AbortSignal.timeout(30_000) })
      if (res.ok) return as === 'json' ? res.json() : res.text()
      if (res.status === 404) return null
    } catch (error) {
      if (attempt === 6) throw error
    }
    await sleep(2000 * attempt)
  }
  throw new Error(`Falhou: ${url}`)
}

/** Todas as páginas de um tipo da API, com imagem destacada e termos. `lang` é o do WPML. */
export async function all(type, lang = 'pt-pt') {
  const items = []
  for (let page = 1; ; page++) {
    const batch = await get(`${API}/${type}?per_page=100&page=${page}&lang=${lang}&_embed=wp:featuredmedia,wp:term`)
    if (!batch || !Array.isArray(batch) || batch.length === 0) break
    items.push(...batch)
    if (batch.length < 100) break
  }
  return items
}

/** Executa `fn` sobre a lista com no máximo `n` pedidos em simultâneo. */
export async function pool(list, n, fn) {
  const out = new Array(list.length)
  let i = 0
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < list.length) {
        const k = i++
        out[k] = await fn(list[k], k)
      }
    }),
  )
  return out
}

export const decode = (html = '') => cheerio.load(`<i>${html}</i>`)('i').text().replace(/\s+/g, ' ').trim()

/** Do srcset, a variante mais pequena com pelo menos `min` px de largura (ou a maior). */
function bestFromSrcset(srcset, min = 1024) {
  const candidates = srcset
    .split(',')
    .map((c) => c.trim().split(/\s+/))
    .map(([url, w]) => ({ url, w: parseInt(w) || 0 }))
    .filter((c) => c.url)
    .sort((a, b) => a.w - b.w)
  return (candidates.find((c) => c.w >= min) ?? candidates.at(-1))?.url
}

/**
 * Limpa o HTML do Elementor/Gutenberg: só estrutura e conteúdo, sem classes nem estilos.
 * As imagens ficam com a variante de ~1024 px; os ficheiros ficam absolutos.
 */
export function clean(html = '') {
  const $ = cheerio.load(html, null, false)
  $('script,style,noscript,form,svg,button,.elementor-button-wrapper,.elementor-share-buttons--view-icon').remove()
  $('img').each((_, el) => {
    const $el = $(el)
    const srcset = $el.attr('data-srcset') || $el.attr('srcset')
    const src = (srcset && bestFromSrcset(srcset)) || $el.attr('data-src') || $el.attr('src')
    if (src) $el.attr('src', src.startsWith('/wp-content/') ? BASE + src : src)
  })
  $('*').each((_, el) => {
    const keep = { a: ['href'], img: ['src', 'alt', 'width', 'height'], iframe: ['src', 'title'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan'] }
    const allowed = keep[el.tagName] ?? []
    for (const attr of Object.keys(el.attribs ?? {})) if (!allowed.includes(attr)) $(el).removeAttr(attr)
  })
  let changed = true
  while (changed) {
    changed = false
    $('div,section,span,figure:not(:has(img)),font,center').each((_, el) => {
      $(el).replaceWith($(el).contents())
      changed = true
    })
  }
  $('p,h1,h2,h3,h4,h5,h6,li').each((_, el) => {
    const $el = $(el)
    if (!$el.text().trim() && !$el.find('img,iframe').length) $el.remove()
  })
  $('a').each((_, el) => {
    const href = $(el).attr('href') ?? ''
    // Ficheiros continuam a ser ficheiros; páginas passam a caminhos internos.
    if (href.startsWith('/wp-content/')) $(el).attr('href', BASE + href)
    else if (href.startsWith(BASE) && !href.includes('/wp-content/')) $(el).attr('href', href.replace(BASE, '') || '/')
  })
  return $.html().replace(/\n{2,}/g, '\n').replace(/[\t ]+\n/g, '\n').trim()
}

/** Corpo de uma página sem o título e a etiqueta de secção, que o layout já mostra. */
export function pageBody(html) {
  const $ = cheerio.load(clean(html), null, false)
  $('h1').first().remove()
  $('p').filter((_, p) => /^(avisos legais|legal notices?)$/i.test($(p).text().trim())).remove()
  return $.html().trim()
}

export function media(item) {
  const m = item._embedded?.['wp:featuredmedia']?.[0]
  if (!m || m.code) return null
  return {
    src: m.source_url,
    alt: m.alt_text || decode(m.title?.rendered),
    width: m.media_details?.width ?? null,
    height: m.media_details?.height ?? null,
  }
}

export const terms = (item) =>
  (item._embedded?.['wp:term'] ?? []).flat().map((t) => ({ id: t.id, slug: t.slug, name: decode(t.name), taxonomy: t.taxonomy }))

export const excerpt = (item) => decode(item.excerpt?.rendered).replace(/\s*\[(…|&hellip;)\]$/, '…')

export async function page$(pathOrUrl) {
  const html = await get(pathOrUrl.startsWith('http') ? pathOrUrl : `${BASE}${pathOrUrl}`, 'text')
  return cheerio.load(html ?? '')
}

/** Itens de uma listagem JetEngine, com textos, ligações e imagens de cada um. */
export function listing($, scope) {
  return (scope ? $(scope).find('.jet-listing-grid__item') : $('.jet-listing-grid__item'))
    .map((_, el) => {
      const it = $(el)
      return {
        id: Number(it.attr('data-post-id')),
        texts: it
          .find('.jet-listing-dynamic-field__content, .jet-listing-dynamic-link__label, .elementor-heading-title')
          .map((_, e) => $(e).text().replace(/\s+/g, ' ').trim())
          .get()
          .filter(Boolean),
        links: it.find('a').map((_, e) => $(e).attr('href')).get(),
        images: it.find('img').map((_, e) => ({ src: $(e).attr('data-src') || $(e).attr('src'), alt: $(e).attr('alt') ?? '' })).get(),
      }
    })
    .get()
}

export { cheerio }

/** Descarrega um ficheiro binário, com as mesmas novas tentativas de `get`. */
export async function download(url) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'builtcolab-redesign-scraper' }, signal: AbortSignal.timeout(60_000) })
      if (res.ok) return Buffer.from(await res.arrayBuffer())
      if (res.status === 404) return null
    } catch (error) {
      if (attempt === 6) throw error
    }
    await sleep(2000 * attempt)
  }
  return null
}
