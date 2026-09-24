import { useEffect, useMemo, type ReactNode } from 'react'
import { homePath, localeInfo, localizeHref, pagePath, routePath, type Locale } from './locales'
import { messagesFor } from './messages'
import { I18nContext, type I18n } from './useI18n'

const parse = (iso: string) => new Date(`${iso.slice(0, 10)}T12:00:00`)

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18n>(() => {
    const long = new Intl.DateTimeFormat(localeInfo[locale].intl, { day: 'numeric', month: 'long', year: 'numeric' })
    const monthShort = new Intl.DateTimeFormat(localeInfo[locale].intl, { month: 'short' })
    return {
      locale,
      t: messagesFor(locale),
      to: (key, slug) => routePath(locale, key, slug),
      home: homePath(locale),
      page: (slug) => pagePath(locale, slug),
      localize: (href) => localizeHref(href, locale),
      formatDate: (iso) => long.format(parse(iso)),
      dateParts: (iso) => {
        const d = parse(iso)
        return {
          day: String(d.getDate()).padStart(2, '0'),
          month: monthShort.format(d).replace('.', '').toUpperCase(),
          year: String(d.getFullYear()).slice(2),
        }
      },
    }
  }, [locale])

  useEffect(() => {
    document.documentElement.lang = localeInfo[locale].htmlLang
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.t.meta.description)
  }, [locale, value])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
