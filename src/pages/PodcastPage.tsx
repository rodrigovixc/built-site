import { EpisodeCard } from '@/components/cards/EpisodeCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { episodes } from '@/lib/content'

export default function PodcastPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t.routes.podcast)
  const { list, machine } = episodes(locale)
  return (
    <>
      <PageHeader eyebrow={t.routes.podcast} title={t.podcast.title} crumbs={[{ label: 'Podcast' }]} intro={t.podcast.intro(list.length)}>
        {(t.podcast.languageNote || machine) && (
          <p className="mt-4 text-sm text-muted">{[t.podcast.languageNote, machine ? t.common.machineNotice : ''].filter(Boolean).join(' ')}</p>
        )}
      </PageHeader>
      <Container className="pb-20">
        {list.map((e) => (
          <EpisodeCard key={e.number} episode={e} />
        ))}
      </Container>
    </>
  )
}
