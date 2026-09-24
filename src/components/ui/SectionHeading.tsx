import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

/** Cabeçalho de secção em duas colunas: título à esquerda, texto de apoio à direita. */
export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-12 grid items-end gap-4 md:mb-14 md:grid-cols-2 md:gap-10">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight md:text-[3.4rem]">{title}</h2>
      </div>
      {children && <div className="text-lg text-muted">{children}</div>}
    </div>
  )
}
