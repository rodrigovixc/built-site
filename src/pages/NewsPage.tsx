import { useSearchParams } from 'react-router'
import { NewsCard } from '@/components/cards/NewsCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePage } from '@/hooks/usePage'
import { useI18n } from '@/i18n/useI18n'
import { newsList } from '@/lib/news'

const PER_PAGE = 12

export default function NewsPage() {
  const { t, to, locale } = useI18n()
  useDocumentTitle(t.routes.news)
  const [params] = useSearchParams()
  const news = newsList(locale)
  const { page, pages, start, end } = usePage(news.length, PER_PAGE, params)

  return (
    <>
      <PageHeader eyebrow={t.news.eyebrow} title={t.routes.news} crumbs={[{ label: t.routes.news }]} intro={t.news.intro(news.length)} />
      <Container className="py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(start, end).map((n) => (
            <NewsCard key={n.id} item={n} href={to('news', n.slug)} />
          ))}
        </div>
        <Pagination page={page} pages={pages} />
      </Container>
    </>
  )
}
