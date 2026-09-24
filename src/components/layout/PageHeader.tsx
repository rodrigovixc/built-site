import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useI18n } from '@/i18n/useI18n'

type Crumb = { label: string; to?: string }

/** Cabeçalho das páginas interiores: fundo branco com grelha técnica. */
export function PageHeader({ eyebrow, title, intro, crumbs, children }: { eyebrow?: string; title: string; intro?: ReactNode; crumbs?: Crumb[]; children?: ReactNode }) {
  const { t, home } = useI18n()
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-14 md:pt-44 md:pb-20">
      <div aria-hidden="true" className="blueprint absolute inset-0 [mask-image:radial-gradient(70%_90%_at_80%_20%,black,transparent)]" />
      <Container className="relative">
        {crumbs && (
          <nav aria-label={t.common.breadcrumb} className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link to={home} className="hover:text-ink">
              {t.common.home}
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 max-w-[20ch] text-4xl leading-[1.02] font-extrabold tracking-tight md:text-6xl">{title}</h1>
        {intro && <div className="mt-6 max-w-[62ch] text-lg text-muted">{intro}</div>}
        {children}
      </Container>
    </section>
  )
}
