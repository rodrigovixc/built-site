import { useEffect } from 'react'
import { useI18n } from '@/i18n/useI18n'

export function useDocumentTitle(title?: string) {
  const { t } = useI18n()
  useEffect(() => {
    document.title = title ? `${title} | BUILT CoLAB` : t.meta.title
  }, [title, t])
}
