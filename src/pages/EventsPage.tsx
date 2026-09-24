import { useSearchParams } from 'react-router'
import { EventRow } from '@/components/cards/EventRow'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips } from '@/components/ui/FilterChips'
import { Pagination } from '@/components/ui/Pagination'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { usePage } from '@/hooks/usePage'
import { useI18n } from '@/i18n/useI18n'
import { collection, splitEvents } from '@/lib/content'

const PER_PAGE = 16

export default function EventsPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t.events.title)
  const [params, setParams] = useSearchParams()
  const { upcoming, past } = splitEvents(collection('events', locale))
  const showPast = params.get('ver') === t.events.pastParam || upcoming.length === 0
  const list = showPast ? past : upcoming
  const { page, pages, start, end } = usePage(list.length, PER_PAGE, params)

  return (
    <>
      <PageHeader eyebrow={t.events.eyebrow} title={t.events.title} crumbs={[{ label: t.events.title }]} intro={t.events.intro} />
      <Container className="py-14 md:py-20">
        <FilterChips
          label={t.events.show}
          value={showPast ? 'past' : 'upcoming'}
          onChange={(v) => setParams(v === 'upcoming' ? {} : { ver: t.events.pastParam }, { preventScrollReset: true })}
          options={[
            { value: 'upcoming', label: t.events.upcoming, count: upcoming.length },
            { value: 'past', label: t.events.past, count: past.length },
          ]}
        />
        {list.length ? (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {list.slice(start, end).map((e) => (
              <EventRow key={e.id} event={e} past={showPast} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState title={t.events.emptyTitle}>{t.events.emptyText}</EmptyState>
          </div>
        )}
        <Pagination page={page} pages={pages} />
      </Container>
    </>
  )
}
