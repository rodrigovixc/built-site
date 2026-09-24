import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'

export function RelatedSection({ title, to, cta, children }: { title: string; to: string; cta: string; children: ReactNode }) {
  return (
    <section className="border-t border-line bg-soft py-16 md:py-20">
      <Container>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link to={to} className="text-sm font-bold text-blue">
            {cta} →
          </Link>
        </div>
        {children}
      </Container>
    </section>
  )
}
