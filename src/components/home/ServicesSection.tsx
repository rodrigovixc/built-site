import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useI18n } from '@/i18n/useI18n'
import type { RouteKey } from '@/i18n/locales'

/** Aparência e destino de cada serviço; os textos estão nos dicionários (t.home.services). */
const look: { icon: ReactNode; tone: string; route: RouteKey }[] = [
  { tone: 'bg-blue', route: 'events', icon: <path d="M4 19V5l8-3 8 3v14l-8 3zM12 22V8M4 5l8 3 8-3" /> },
  {
    tone: 'bg-cyan',
    route: 'services',
    icon: <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />,
  },
  { tone: 'bg-green', route: 'diagnostic', icon: <path d="M3 12l6 6L21 6M3 5h8" /> },
]

export function ServicesSection() {
  const { t, to } = useI18n()
  const h = t.home
  return (
    <section id="servicos" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={h.servicesEyebrow} title={h.servicesTitle}>
            {h.servicesText}
          </SectionHeading>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {h.services.map((s, i) => (
            <Reveal key={s.title}>
              <Link
                to={to(look[i].route)}
                className="group flex h-full min-h-80 flex-col gap-3.5 rounded-2xl border border-line bg-card p-8 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-blue"
              >
                <span className={`grid size-13 place-items-center rounded-xl text-white ${look[i].tone}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6.5" aria-hidden="true">
                    {look[i].icon}
                  </svg>
                </span>
                <h3 className="mt-auto text-2xl font-bold">{s.title}</h3>
                <p className="text-[0.95rem] text-muted">{s.text}</p>
                <span className="flex items-center gap-2 text-sm font-bold text-blue">
                  {s.cta} <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
