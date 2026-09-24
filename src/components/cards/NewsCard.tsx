import { Link } from 'react-router'
import { Img } from '@/components/ui/Img'
import { useI18n } from '@/i18n/useI18n'
import { tidyExcerpt } from '@/lib/format'
import type { Entry } from '@/lib/types'

/** Cartão de notícia ou insight: imagem, data, título e resumo. */
export function NewsCard({ item, href, label }: { item: Entry; href: string; label?: string }) {
  const { t, formatDate } = useI18n()
  return (
    <Link
      to={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-blue"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <Img media={item.image} className="size-full transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">
          {label && <span className="text-green">{label} · </span>}
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </p>
        <h3 className="text-lg leading-snug font-bold group-hover:text-blue">{item.title}</h3>
        <p className="text-sm text-muted">{tidyExcerpt(item.excerpt, 150)}</p>
        <span className="mt-auto pt-2 text-sm font-bold text-blue">{t.common.readMore} →</span>
      </div>
    </Link>
  )
}
