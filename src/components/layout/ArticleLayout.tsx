import type { ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { Img } from '@/components/ui/Img'
import { BodyContent } from '@/components/ui/Prose'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import type { Body, Entry } from '@/lib/types'

type Props = {
  entry: Entry
  body: Body | null | undefined
  eyebrow: string
  crumbs: { label: string; to?: string }[]
  meta?: ReactNode
  aside?: ReactNode
  related?: ReactNode
}

/** Modelo comum a notícias, insights, eventos e projetos. */
export function ArticleLayout({ entry, body, eyebrow, crumbs, meta, aside, related }: Props) {
  useDocumentTitle(entry.title)
  return (
    <article>
      <PageHeader eyebrow={eyebrow} title={entry.title} crumbs={crumbs}>
        {meta && <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted">{meta}</div>}
      </PageHeader>
      <Container className="py-14 md:py-20">
        {entry.image && (
          <figure className="mb-14 overflow-hidden rounded-3xl bg-soft">
            <Img media={entry.image} size="full" className="max-h-[560px] w-full" />
          </figure>
        )}
        <div className={aside ? 'grid gap-12 lg:grid-cols-[1fr_300px]' : ''}>
          <div>
            <BodyContent body={body} fallbackText={entry.excerpt} />
          </div>
          {aside && <aside className="grid content-start gap-6 lg:sticky lg:top-28">{aside}</aside>}
        </div>
      </Container>
      {related}
    </article>
  )
}

/** Caixa lateral de ficha técnica. */
export function FactSheet({ title, rows }: { title: string; rows: { label: string; value: ReactNode }[] }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <h2 className="text-xs font-bold tracking-[0.14em] text-muted uppercase">{title}</h2>
      <dl className="mt-4 grid gap-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs font-semibold text-muted">{r.label}</dt>
            <dd className="mt-0.5 font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
