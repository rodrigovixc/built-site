import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { BodyContent } from '@/components/ui/Prose'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { loadPage } from '@/lib/content'
import { legalPages } from '@/lib/site'
import type { Page } from '@/lib/types'
import NotFoundPage from './NotFoundPage'

/** Páginas soltas do WordPress (avisos legais, prémios, CT 197, formações…), por slug. */
export default function CmsPage() {
  const { slug = '' } = useParams()
  const { t, locale } = useI18n()
  const key = `${locale}/${slug}`
  const [state, setState] = useState<{ key: string; page: Page | null } | undefined>()

  useEffect(() => {
    let alive = true
    loadPage(slug, locale).then((page) => alive && setState({ key, page }))
    return () => {
      alive = false
    }
  }, [slug, locale, key])

  const page = state?.key === key ? state.page : undefined
  useDocumentTitle(page?.title)

  if (page === null) return <NotFoundPage />
  const legal = legalPages.some((l) => l.slug === slug)

  return (
    <>
      <PageHeader eyebrow={legal ? t.cms.eyebrowLegal : 'BUILT CoLAB'} title={page?.title ?? ' '} crumbs={[{ label: page?.title ?? '…' }]} />
      <Container className="py-14 md:py-20">
        <BodyContent body={page} fallbackText="" />
      </Container>
    </>
  )
}
