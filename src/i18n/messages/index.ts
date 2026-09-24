import type { Locale } from '../locales'
import pt, { type Messages } from './pt'

/** PT vem no bundle; EN e ES só se descarregam quando alguém entra nesse idioma. */
const loaded: Partial<Record<Locale, Messages>> = { pt }

const loaders: Record<Exclude<Locale, 'pt'>, () => Promise<{ default: Messages }>> = {
  en: () => import('./en'),
  es: () => import('./es'),
}

export async function loadMessages(locale: Locale) {
  if (!loaded[locale] && locale !== 'pt') loaded[locale] = (await loaders[locale]()).default
  return loaded[locale]!
}

/** Só depois de loadMessages (o router garante isso no loader do idioma). */
export const messagesFor = (locale: Locale) => loaded[locale] ?? pt
