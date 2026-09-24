import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/useI18n'
import { loadBody } from '@/lib/content'
import type { Body, ContentKind } from '@/lib/types'

/** Corpo de um item no idioma actual; `undefined` enquanto carrega, `null` se não existir. */
export function useBody(kind: ContentKind, slug: string | undefined) {
  const { locale } = useI18n()
  const [state, setState] = useState<{ key: string; body: Body | null } | undefined>()
  const key = `${locale}/${kind}/${slug}`

  useEffect(() => {
    if (!slug) return
    let alive = true
    loadBody(kind, slug, locale).then((body) => alive && setState({ key, body }))
    return () => {
      alive = false
    }
  }, [kind, slug, locale, key])

  return state?.key === key ? state.body : undefined
}
