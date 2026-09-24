import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { I18nProvider } from '@/i18n/context'
import { useI18n } from '@/i18n/useI18n'
import type { Locale } from '@/i18n/locales'
import { Footer } from './Footer'
import { Header } from './Header'

/** Topo da página em cada navegação; âncoras (#areas) descem até à secção. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function Shell() {
  const { t } = useI18n()
  return (
    <>
      <a href="#conteudo" className="sr-only z-50 rounded bg-blue px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {t.common.skipToContent}
      </a>
      <ScrollManager />
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

/** Um layout por idioma: o router monta /, /en e /es com este componente. */
export function Layout({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <Shell />
    </I18nProvider>
  )
}
