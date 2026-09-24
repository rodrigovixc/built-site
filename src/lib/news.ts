import newsJson from '@/data/news.json'
import type { Locale } from '@/i18n/locales'
import { localize } from './content'
import type { NewsItem, Overlay } from './types'

/** Índice completo das notícias, importado só pelas páginas de notícias. */
const pt = newsJson as NewsItem[]
const overlayFiles = import.meta.glob<Overlay>('../data/i18n/*/news.json', { import: 'default' })
const cache = new Map<Locale, NewsItem[]>([['pt', pt]])

/** Carrega os títulos traduzidos do idioma; o router chama-o no loader das páginas de notícias. */
export async function preloadNews(locale: Locale) {
  if (cache.has(locale)) return
  const overlay = (await overlayFiles[`../data/i18n/${locale}/news.json`]?.()) ?? {}
  cache.set(locale, localize(pt, overlay))
}

/** Só depois de preloadNews; até lá, devolve o índice em PT. */
export const newsList = (locale: Locale) => cache.get(locale) ?? pt
