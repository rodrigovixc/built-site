import { ExternalArrow } from '@/components/ui/Arrow'
import { useI18n } from '@/i18n/useI18n'
import type { Episode } from '@/lib/types'

const platform = (url: string) =>
  url.includes('spotify') ? 'Spotify' : url.includes('apple') ? 'Apple Podcasts' : url.includes('youtube') ? 'YouTube' : url.includes('google') ? 'Google Podcasts' : null

export function EpisodeCard({ episode }: { episode: Episode }) {
  const { t } = useI18n()
  return (
    <article className="grid gap-6 border-b border-line py-10 md:grid-cols-[120px_1fr]">
      <p className="font-display text-6xl leading-none font-extrabold text-blue/20 tabular-nums md:text-7xl">
        {String(episode.number).padStart(2, '0')}
      </p>
      <div>
        <p className="text-xs font-bold tracking-[0.14em] text-green uppercase">{t.podcast.episode(episode.number)}</p>
        <h2 className="mt-2 text-2xl font-bold">{episode.title}</h2>
        {episode.description && (
          <div className="mt-4 max-w-[70ch] space-y-3 text-muted">
            {episode.description.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {episode.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {episode.links.map((l) => (
              <a key={l} href={l} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-soft px-4 py-2 text-sm font-semibold text-blue hover:bg-line">
                {platform(l) ?? t.podcast.listen} <ExternalArrow />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
