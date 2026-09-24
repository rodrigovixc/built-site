import areasJson from '@/data/areas.json'
import associatesJson from '@/data/associates.json'
import eventsJson from '@/data/events.json'
import governanceJson from '@/data/governance.json'
import insightsJson from '@/data/insights.json'
import jobsJson from '@/data/jobs.json'
import newsLatestJson from '@/data/news-latest.json'
import podcastJson from '@/data/podcast.json'
import projectsJson from '@/data/projects.json'
import teamJson from '@/data/team.json'
import type { Locale } from '@/i18n/locales'
import type { Area, Associate, Body, ContentKind, Entry, EventItem, Episode, GoverningBody, Insight, Job, NewsItem, Overlay, Page, Project, TeamMember } from './types'

/*
 * Os JSON em src/data são gerados por `npm run data` a partir de content/.
 * O índice está em PT; cada idioma sobrepõe título e resumo (src/data/i18n/<locale>/).
 * Nenhum componente importa os JSON directamente.
 */

type PodcastOverlay = { machine: boolean; episodes: Record<string, { title: string; description: string }> }

/*
 * Títulos e resumos traduzidos: só se descarregam os do idioma visitado.
 * O router chama preloadLocale() no loader de /en e /es antes de mostrar a página.
 */
const overlayFiles = import.meta.glob<Overlay>('../data/i18n/*/{projects,insights,events,jobs,news-latest}.json', { import: 'default' })
const podcastFiles = import.meta.glob<PodcastOverlay>('../data/i18n/*/podcast.json', { import: 'default' })
const overlays = new Map<string, Overlay>()
const podcastOverlays = new Map<Locale, PodcastOverlay>()

export async function preloadLocale(locale: Locale) {
  if (locale === 'pt' || podcastOverlays.has(locale)) return
  await Promise.all([
    ...Object.entries(overlayFiles)
      .filter(([path]) => path.includes(`/i18n/${locale}/`))
      .map(async ([path, load]) => overlays.set(path, await load())),
    podcastFiles[`../data/i18n/${locale}/podcast.json`]?.().then((o) => podcastOverlays.set(locale, o)),
  ])
}

const overlayOf = (locale: Locale, name: string): Overlay => overlays.get(`../data/i18n/${locale}/${name}.json`) ?? {}

/** Aplica título e resumo do idioma; o que não estiver traduzido fica em PT. */
export function localize<T extends Entry>(items: T[], overlay: Overlay): T[] {
  return items.map((item) => (overlay[item.slug] ? { ...item, ...overlay[item.slug] } : item))
}

const cache = new Map<string, unknown>()
function memo<T>(key: string, build: () => T): T {
  if (!cache.has(key)) cache.set(key, build())
  return cache.get(key) as T
}

const base = {
  projects: projectsJson as Project[],
  insights: insightsJson as Insight[],
  events: eventsJson as EventItem[],
  jobs: jobsJson as Job[],
  'news-latest': newsLatestJson as NewsItem[],
}

type Collections = typeof base
export type CollectionName = keyof Collections

/** Colecção no idioma pedido, já ordenada (mais recente primeiro). */
export function collection<K extends CollectionName>(name: K, locale: Locale): Collections[K] {
  return memo(`${name}/${locale}`, () => (locale === 'pt' ? base[name] : localize(base[name] as Entry[], overlayOf(locale, name))) as Collections[K])
}

export const team = teamJson as TeamMember[]
export const governance = governanceJson as GoverningBody[]
export const associates = associatesJson as Associate[]
/** "all" é um termo técnico do WordPress; já vem filtrado. */
export const areas = areasJson as Area[]

export function episodes(locale: Locale): { list: Episode[]; machine: boolean } {
  return memo(`podcast/${locale}`, () => {
    const pt = podcastJson as Episode[]
    const o = podcastOverlays.get(locale)
    if (locale === 'pt' || !o) return { list: pt, machine: false }
    return { list: pt.map((e) => ({ ...e, ...(o.episodes[e.number] ?? {}) })), machine: o.machine }
  })
}

/** Corpo servido como ficheiro estático (public/content), para não pesar no bundle. */
async function fetchBody(locale: Locale, kind: ContentKind, slug: string): Promise<Body | null> {
  const res = await fetch(`/content/${locale}/${kind}/${encodeURIComponent(slug)}.json`)
  // Um servidor de SPA pode responder 200 com o index.html a um ficheiro que não existe.
  return res.ok && res.headers.get('content-type')?.includes('json') ? res.json() : null
}

/** Corpo de um item no idioma; se não existir, o PT com `fallback: true`. */
export async function loadBody(kind: ContentKind, slug: string, locale: Locale): Promise<Body | null> {
  const own = await fetchBody(locale, kind, slug)
  if (own || locale === 'pt') return own
  const pt = await fetchBody('pt', kind, slug)
  return pt ? { ...pt, fallback: true } : null
}

const pageFiles = import.meta.glob<Record<string, Page>>('../data/pages/*.json', { import: 'default' })

/** Páginas soltas do WordPress (termos, privacidade, prémios…), com o mesmo recurso ao PT. */
export async function loadPage(slug: string, locale: Locale): Promise<Page | null> {
  const own = (await pageFiles[`../data/pages/${locale}.json`]?.())?.[slug]
  if (own) return own
  const pt = (await pageFiles['../data/pages/pt.json']())[slug]
  return pt ? { ...pt, fallback: locale !== 'pt' } : null
}

/** Eventos futuros primeiro (do mais próximo para o mais distante), depois os passados. */
export function splitEvents(list: EventItem[], today = new Date().toISOString().slice(0, 10)) {
  return { upcoming: list.filter((e) => e.startsAt >= today).reverse(), past: list.filter((e) => e.startsAt < today) }
}

/** Imagem pequena (até 800 px) para cartões. */
export const smallImage = (src: string) => (src.startsWith('/media/') ? src.replace(/\.webp$/, '-sm.webp') : src)
