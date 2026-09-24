import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useI18n } from '@/i18n/useI18n'
import { associates, collection, team } from '@/lib/content'

const FOUNDED = 2020

/** Bloco inclinado + números reais do laboratório. */
export function StatementSection() {
  const { t, to, locale } = useI18n()
  const h = t.home
  const stats = [
    { value: new Date().getFullYear() - FOUNDED, label: h.statYears },
    { value: collection('projects', locale).length, label: h.statProjects },
    { value: team.length, label: h.statTeam },
    { value: associates.length, label: h.statAssociates },
  ]
  return (
    <section id="sobre" className="overflow-hidden py-20 md:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="relative py-10 pl-10">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[62%] -skew-x-[14deg] rounded-md bg-blue" />
          <span aria-hidden="true" className="absolute inset-y-0 left-[14%] w-[62%] -skew-x-[14deg] rounded-md bg-linear-135 from-cyan to-green opacity-35 mix-blend-multiply" />
          <h2 className="relative text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[0.95] font-extrabold tracking-tight uppercase">
            <span className="text-white">
              {h.statementLine1}
              <br />
              {h.statementLine2}
            </span>
            <br />
            {h.statementLine3}
            <br />
            {h.statementLine4}
          </h2>
        </Reveal>
        <Reveal>
          <h3 className="text-3xl font-bold">{h.statementTitle}</h3>
          <p className="mt-4 max-w-[54ch] text-muted">{h.statementText}</p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-7 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl leading-none font-extrabold text-blue tabular-nums">{s.value}</dd>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
          <Button to={to('about')} className="mt-8">
            {h.statementCta}
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
