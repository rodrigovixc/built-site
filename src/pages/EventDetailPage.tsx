import { useParams } from 'react-router'
import { EventRow } from '@/components/cards/EventRow'
import { ArticleLayout, FactSheet } from '@/components/layout/ArticleLayout'
import { RelatedSection } from '@/components/layout/RelatedSection'
import { Button } from '@/components/ui/Button'
import { useBody } from '@/hooks/useBody'
import { useI18n } from '@/i18n/useI18n'
import { collection } from '@/lib/content'
import { contact } from '@/lib/site'
import NotFoundPage from './NotFoundPage'

export default function EventDetailPage() {
  const { slug } = useParams()
  const { t, to, locale, formatDate } = useI18n()
  const events = collection('events', locale)
  const event = events.find((e) => e.slug === slug)
  const body = useBody('events', slug)
  if (!event) return <NotFoundPage />

  const upcoming = event.startsAt >= new Date().toISOString().slice(0, 10)
  const location = event.location ? (t.locations[event.location] ?? event.location) : t.events.tba

  return (
    <ArticleLayout
      entry={event}
      body={body}
      eyebrow={upcoming ? t.events.eyebrowUpcoming : t.events.eyebrowPast}
      crumbs={[{ label: t.events.title, to: to('events') }, { label: formatDate(event.startsAt) }]}
      meta={
        <>
          <time dateTime={event.startsAt}>{formatDate(event.startsAt)}</time>
          <span className="before:mr-5 before:text-line before:content-['/']">{location}</span>
        </>
      }
      aside={
        <>
          <FactSheet
            title={t.events.info}
            rows={[
              { label: t.events.date, value: formatDate(event.startsAt) },
              { label: t.events.location, value: location },
            ]}
          />
          {upcoming && (
            <div className="rounded-2xl bg-blue p-6 text-white">
              <p className="font-display text-lg font-bold">{t.events.joinTitle}</p>
              <p className="mt-1 text-sm text-white/80">{t.events.joinText}</p>
              <p className="mt-3 text-sm font-semibold select-all">{contact.email}</p>
              <Button to={to('contact')} variant="light" size="sm" className="mt-4">
                {t.events.joinButton}
              </Button>
            </div>
          )}
        </>
      }
      related={
        <RelatedSection title={t.events.others} to={to('events')} cta={t.events.all}>
          <div className="grid gap-3 md:grid-cols-3">
            {events
              .filter((e) => e.id !== event.id)
              .slice(0, 3)
              .map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
          </div>
        </RelatedSection>
      }
    />
  )
}
