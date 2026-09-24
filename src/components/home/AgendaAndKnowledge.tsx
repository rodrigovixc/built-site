import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { EventRow } from '@/components/cards/EventRow'
import { InsightItem } from '@/components/cards/InsightItem'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useI18n } from '@/i18n/useI18n'
import { collection, episodes } from '@/lib/content'

function Column({ title, to, cta, children }: { title: string; to: string; cta: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link to={to} className="text-sm font-bold text-blue">
          {cta} →
        </Link>
      </div>
      {children}
    </Reveal>
  )
}

export function AgendaAndKnowledge() {
  const { t, to, locale } = useI18n()
  const h = t.home
  const [episode] = episodes(locale).list
  const knowledge = [
    ...collection('insights', locale)
      .slice(0, 2)
      .map((i) => ({ kind: h.kindInsight, title: i.title, to: to('insights', i.slug) })),
    ...(episode ? [{ kind: h.kindPodcast, title: `TechOnBuilt · ${episode.title}`, to: to('podcast') }] : []),
    ...collection('news-latest', locale)
      .slice(0, 1)
      .map((n) => ({ kind: h.kindNews, title: n.title, to: to('news', n.slug) })),
  ]
  return (
    <section id="agenda" className="border-t border-line py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-2">
        <Column title={h.agendaTitle} to={to('events')} cta={h.agendaAll}>
          <div className="grid gap-3">
            {collection('events', locale)
              .slice(0, 3)
              .map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
          </div>
        </Column>
        <Column title={h.knowledgeTitle} to={to('insights')} cta={t.common.seeAll}>
          {knowledge.map((k) => (
            <InsightItem key={k.to + k.title} {...k} />
          ))}
        </Column>
      </Container>
    </section>
  )
}
