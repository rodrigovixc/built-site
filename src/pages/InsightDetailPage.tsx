import { useParams } from 'react-router'
import { NewsCard } from '@/components/cards/NewsCard'
import { ArticleLayout } from '@/components/layout/ArticleLayout'
import { RelatedSection } from '@/components/layout/RelatedSection'
import { useBody } from '@/hooks/useBody'
import { useI18n } from '@/i18n/useI18n'
import { collection } from '@/lib/content'
import NotFoundPage from './NotFoundPage'

export default function InsightDetailPage() {
  const { slug } = useParams()
  const { t, to, locale, formatDate } = useI18n()
  const insights = collection('insights', locale)
  const item = insights.find((n) => n.slug === slug)
  const body = useBody('insights', slug)
  if (!item) return <NotFoundPage />

  return (
    <ArticleLayout
      entry={item}
      body={body}
      eyebrow={t.insights.eyebrowDetail}
      crumbs={[{ label: t.routes.insights, to: to('insights') }, { label: formatDate(item.date) }]}
      meta={<time dateTime={item.date}>{formatDate(item.date)}</time>}
      related={
        <RelatedSection title={t.insights.more} to={to('insights')} cta={t.insights.all}>
          <div className="grid gap-6 md:grid-cols-3">
            {insights
              .filter((n) => n.id !== item.id)
              .slice(0, 3)
              .map((n) => (
                <NewsCard key={n.id} item={n} href={to('insights', n.slug)} label={t.insights.eyebrowDetail} />
              ))}
          </div>
        </RelatedSection>
      }
    />
  )
}
