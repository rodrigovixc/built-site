/** Idiomas do site, prefixos de URL e o nome traduzido de cada rota. */

export const locales = ['pt', 'en', 'es'] as const
export type Locale = (typeof locales)[number]

export const localeInfo: Record<Locale, { label: string; name: string; htmlLang: string; intl: string; prefix: string }> = {
  pt: { label: 'PT', name: 'Português', htmlLang: 'pt-PT', intl: 'pt-PT', prefix: '' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', intl: 'en-GB', prefix: '/en' },
  es: { label: 'ES', name: 'Español', htmlLang: 'es', intl: 'es-ES', prefix: '/es' },
}

export type RouteKey =
  | 'about'
  | 'team'
  | 'associates'
  | 'governance'
  | 'careers'
  | 'projects'
  | 'news'
  | 'events'
  | 'insights'
  | 'podcast'
  | 'services'
  | 'contact'
  | 'diagnostic'

/** Segmentos de cada rota por idioma. Os de PT são os endereços do site actual. */
export const segments: Record<Locale, Record<RouteKey, string>> = {
  pt: {
    about: 'built',
    team: 'built/equipa',
    associates: 'built/associados',
    governance: 'built/orgaos-sociais',
    careers: 'built/recrutamento',
    projects: 'projetos',
    news: 'noticias',
    events: 'eventos',
    insights: 'insights',
    podcast: 'podcast-techonbuilt',
    services: 'digitalbuilt',
    contact: 'contactos',
    diagnostic: 'diagnostico',
  },
  en: {
    about: 'about',
    team: 'about/team',
    associates: 'about/associates',
    governance: 'about/governing-bodies',
    careers: 'about/careers',
    projects: 'projects',
    news: 'news',
    events: 'events',
    insights: 'insights',
    podcast: 'podcast-techonbuilt',
    services: 'digitalbuilt',
    contact: 'contact',
    diagnostic: 'diagnostic',
  },
  es: {
    about: 'sobre',
    team: 'sobre/equipo',
    associates: 'sobre/asociados',
    governance: 'sobre/organos-sociales',
    careers: 'sobre/empleo',
    projects: 'proyectos',
    news: 'noticias',
    events: 'eventos',
    insights: 'insights',
    podcast: 'podcast-techonbuilt',
    services: 'digitalbuilt',
    contact: 'contacto',
    diagnostic: 'diagnostico',
  },
}

const routeKeys = Object.keys(segments.pt) as RouteKey[]

export const homePath = (locale: Locale) => localeInfo[locale].prefix || '/'

/** Caminho de uma rota (e, opcionalmente, de um item dentro dela) num idioma. */
export function routePath(locale: Locale, key: RouteKey, slug?: string) {
  return `${localeInfo[locale].prefix}/${segments[locale][key]}${slug ? `/${slug}` : ''}`
}

/** Caminho de uma página solta do WordPress (termos, prémios…), que mantém o slug PT. */
export const pagePath = (locale: Locale, slug: string) => `${localeInfo[locale].prefix}/${slug}`

/** Idioma de um caminho, pelo prefixo. */
export function localeOf(pathname: string): Locale {
  return (locales.find((l) => l !== 'pt' && (pathname === `/${l}` || pathname.startsWith(`/${l}/`))) ?? 'pt') as Locale
}

/** Separa um caminho de um idioma em rota + resto, ou null se não for uma rota conhecida. */
function matchRoute(locale: Locale, path: string): { key: RouteKey; rest: string } | null {
  const candidates = routeKeys
    .map((key) => ({ key, seg: `/${segments[locale][key]}` }))
    .filter(({ seg }) => path === seg || path.startsWith(`${seg}/`))
    .sort((a, b) => b.seg.length - a.seg.length)
  return candidates[0] ? { key: candidates[0].key, rest: path.slice(candidates[0].seg.length) } : null
}

/** Converte um caminho de um idioma para o equivalente noutro (selector de idioma). */
export function translatePath(pathname: string, from: Locale, to: Locale) {
  const [raw, suffix = ''] = pathname.split(/(?=[?#])/)
  const path = raw.slice(localeInfo[from].prefix.length) || '/'
  if (path === '/') return homePath(to) + suffix
  const match = matchRoute(from, path)
  const target = match ? `/${segments[to][match.key]}${match.rest}` : path
  return `${localeInfo[to].prefix}${target}${suffix}`
}

/** Ligações internas do conteúdo (escritas em caminhos PT) no idioma actual. */
export const localizeHref = (href: string, to: Locale) => translatePath(href, 'pt', to)
