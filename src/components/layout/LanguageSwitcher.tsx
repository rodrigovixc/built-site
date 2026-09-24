import { Link, useLocation } from 'react-router'
import { useI18n } from '@/i18n/useI18n'
import { localeInfo, locales, translatePath } from '@/i18n/locales'

/** PT · EN · ES, levando para a mesma página no outro idioma. */
export function LanguageSwitcher({ tone = 'ink' }: { tone?: 'ink' | 'light' }) {
  const { locale, t } = useI18n()
  const { pathname, search, hash } = useLocation()
  const idle = tone === 'ink' ? 'text-muted hover:text-ink' : 'text-mist hover:text-white'
  const active = tone === 'ink' ? 'text-ink' : 'text-white'

  return (
    <nav aria-label={t.common.language} className="flex items-center gap-1 text-sm font-semibold">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-line">/</span>}
          <Link
            to={translatePath(pathname, locale, l) + search + hash}
            hrefLang={localeInfo[l].htmlLang}
            lang={localeInfo[l].htmlLang}
            title={localeInfo[l].name}
            aria-current={l === locale ? 'true' : undefined}
            className={`rounded px-1 py-0.5 ${l === locale ? active : idle}`}
          >
            {localeInfo[l].label}
          </Link>
        </span>
      ))}
    </nav>
  )
}
