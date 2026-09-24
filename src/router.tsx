import { createBrowserRouter, type RouteObject } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { locales, localeInfo, segments, type Locale, type RouteKey } from '@/i18n/locales'
import HomePage from '@/pages/HomePage'
import LegacyProjectRedirect from '@/pages/LegacyProjectRedirect'
import { loadMessages } from '@/i18n/messages'
import { preloadLocale } from '@/lib/content'
import NotFoundPage from '@/pages/NotFoundPage'

type PageModule = { default: React.ComponentType }

/** Cada página num pedaço próprio do bundle. */
const page = (load: () => Promise<PageModule>): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => ({ Component: (await load()).default }),
})

const pages: Record<RouteKey, () => Promise<PageModule>> = {
  about: () => import('@/pages/AboutPage'),
  team: () => import('@/pages/TeamPage'),
  associates: () => import('@/pages/AssociatesPage'),
  governance: () => import('@/pages/GovernancePage'),
  careers: () => import('@/pages/CareersPage'),
  projects: () => import('@/pages/ProjectsPage'),
  news: () => import('@/pages/NewsPage'),
  events: () => import('@/pages/EventsPage'),
  insights: () => import('@/pages/InsightsPage'),
  podcast: () => import('@/pages/PodcastPage'),
  services: () => import('@/pages/DigitalBuiltPage'),
  contact: () => import('@/pages/ContactPage'),
  diagnostic: () => import('@/pages/DiagnosticPage'),
}

/** As notícias têm índice próprio (grande), carregado só nas suas páginas. */
const newsLoader = (locale: Locale) => async () => {
  const { preloadNews } = await import('@/lib/news')
  await preloadNews(locale)
  return null
}

const details: Partial<Record<RouteKey, () => Promise<PageModule>>> = {
  projects: () => import('@/pages/ProjectDetailPage'),
  news: () => import('@/pages/NewsDetailPage'),
  events: () => import('@/pages/EventDetailPage'),
  insights: () => import('@/pages/InsightDetailPage'),
}

/** As mesmas páginas em cada idioma, com os caminhos traduzidos (ver i18n/locales.ts). */
function localeRoutes(locale: Locale): RouteObject[] {
  const keys = Object.keys(pages) as RouteKey[]
  return [
    { index: true, element: <HomePage /> },
    ...keys.map((key) => ({ path: segments[locale][key], ...page(pages[key]), ...(key === 'news' ? { loader: newsLoader(locale) } : {}) })),
    ...keys
      .filter((key) => details[key])
      .map((key) => ({ path: `${segments[locale][key]}/:slug`, ...page(details[key]!), ...(key === 'news' ? { loader: newsLoader(locale) } : {}) })),
    ...(locale === 'pt'
      ? [
          { path: 'projectos', element: <LegacyProjectRedirect /> },
          { path: 'projectos/:slug', element: <LegacyProjectRedirect /> },
        ]
      : []),
    // Restantes páginas do WordPress: avisos legais, prémios, CT 197, formações…
    { path: ':slug', ...page(() => import('@/pages/CmsPage')) },
    { path: '*', element: <NotFoundPage /> },
  ]
}

export const router = createBrowserRouter(
  locales.map((locale) => ({
    path: localeInfo[locale].prefix || '/',
    element: <Layout locale={locale} />,
    // Textos e títulos do idioma antes da primeira página: nada aparece meio traduzido.
    loader: async () => {
      await Promise.all([loadMessages(locale), preloadLocale(locale)])
      return null
    },
    hydrateFallbackElement: null,
    children: localeRoutes(locale),
  })),
)
