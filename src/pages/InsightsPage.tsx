import { useSearchParams } from 'react-router'
import { NewsCard } from '@/components/cards/NewsCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePage } from '@/hooks/usePage'
import { useI18n } from '@/i18n/useI18n'
import { collection } from '@/lib/content'

const PER_PAGE = 12

export default function InsightsPage() {
  const { t, to, locale } = useI18n()
  useDocumentTitle(t.routes.insights)
  const [params] = useSearchParams()
  const insights = collection('insights', locale)
  const { page, pages, start, end } = usePage(insights.length, PER_PAGE, params)

  return (
    <>
      <PageHeader eyebrow={t.insights.eyebrow} title={t.insights.title} crumbs={[{ label: t.routes.insights }]} intro={t.insights.intro} />
      <Container className="py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.slice(start, end).map((n) => (
            <NewsCard key={n.id} item={n} href={to('insights', n.slug)} label={t.insights.eyebrowDetail} />
          ))}
        </div>
        <Pagination page={page} pages={pages} />
      </Container>
    </>
  )
}
