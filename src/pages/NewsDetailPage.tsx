import { useParams } from 'react-router'
import { NewsCard } from '@/components/cards/NewsCard'
import { ArticleLayout } from '@/components/layout/ArticleLayout'
import { RelatedSection } from '@/components/layout/RelatedSection'
import { useBody } from '@/hooks/useBody'
import { useI18n } from '@/i18n/useI18n'
import { newsList } from '@/lib/news'
import NotFoundPage from './NotFoundPage'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const { t, to, locale, formatDate } = useI18n()
  const news = newsList(locale)
  const item = news.find((n) => n.slug === slug)
  const body = useBody('news', slug)
  if (!item) return <NotFoundPage />

  return (
    <ArticleLayout
      entry={item}
      body={body}
      eyebrow={t.news.eyebrowDetail}
      crumbs={[{ label: t.routes.news, to: to('news') }, { label: formatDate(item.date) }]}
      meta={<time dateTime={item.date}>{formatDate(item.date)}</time>}
      related={
        <RelatedSection title={t.news.more} to={to('news')} cta={t.news.all}>
          <div className="grid gap-6 md:grid-cols-3">
            {news
              .filter((n) => n.id !== item.id)
              .slice(0, 3)
              .map((n) => (
                <NewsCard key={n.id} item={n} href={to('news', n.slug)} />
              ))}
          </div>
        </RelatedSection>
      }
    />
  )
}
