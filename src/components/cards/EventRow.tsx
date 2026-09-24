import { Link } from 'react-router'
import { DateBlock } from '@/components/ui/DateBlock'
import { useI18n } from '@/i18n/useI18n'
import type { EventItem } from '@/lib/types'

/** Linha de agenda: bloco de data, local e título. */
export function EventRow({ event, past = false }: { event: EventItem; past?: boolean }) {
  const { t, to } = useI18n()
  const location = event.location ? (t.locations[event.location] ?? event.location) : t.common.locationTba
  return (
    <Link
      to={to('events', event.slug)}
      className={`grid grid-cols-[76px_1fr] items-center gap-5 rounded-2xl border border-line bg-card p-5 transition hover:border-blue ${past ? 'opacity-80' : ''}`}
    >
      <DateBlock iso={event.startsAt} />
      <div>
        <p className="text-xs font-semibold text-muted">{location}</p>
        <h3 className="mt-1 font-display text-[1.05rem] leading-snug font-bold">{event.title}</h3>
      </div>
    </Link>
  )
}
