import { createContext, useContext } from 'react'
import type { Locale, RouteKey } from './locales'
import type { Messages } from './messages/pt'

export type I18n = {
  locale: Locale
  t: Messages
  /** Caminho de uma rota neste idioma. */
  to: (key: RouteKey, slug?: string) => string
  home: string
  page: (slug: string) => string
  /** Ligação interna escrita em PT (conteúdo do WordPress) no idioma actual. */
  localize: (href: string) => string
  formatDate: (iso: string) => string
  dateParts: (iso: string) => { day: string; month: string; year: string }
}

export const I18nContext = createContext<I18n | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n fora do I18nProvider')
  return ctx
}
