import { CtaBand } from '@/components/home/CtaBand'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { trainingHours, trainingPages } from '@/lib/site'

const tones = ['bg-blue', 'bg-cyan', 'bg-green']

export default function DigitalBuiltPage() {
  const { t, to, page } = useI18n()
  const s = t.services
  useDocumentTitle(`DIGITALbuilt – ${t.routes.services}`)
  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} crumbs={[{ label: t.routes.services }]} intro={s.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={to('diagnostic')}>{s.ctaDiagnostic}</Button>
          <Button to={to('contact')} variant="outline">
            {s.ctaTeam}
          </Button>
        </div>
      </PageHeader>

      {s.groups.map((g, gi) => (
        <section key={g.name} className={`py-16 md:py-24 ${gi % 2 ? 'bg-soft' : ''}`}>
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <span className={`block h-1.5 w-12 rounded-full ${tones[gi]}`} />
              <Eyebrow className="mt-5 text-muted">{s.scope(gi + 1, s.groups.length)}</Eyebrow>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{g.name}</h2>
              <p className="mt-4 text-muted">{g.intro}</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.services.map((item, si) => {
                const key = `${gi}-${si}`
                // O último âmbito (diagnóstico) leva ao formulário; as formações com página, à página.
                const target = gi === s.groups.length - 1 ? to('diagnostic') : trainingPages[key] ? page(trainingPages[key]) : null
                return (
                  <Reveal key={item.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-card p-6">
                    {trainingHours[key] && <span className="text-xs font-bold tracking-[0.12em] text-blue uppercase tabular-nums">{trainingHours[key]}</span>}
                    <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
                    <p className="text-sm text-muted">{item.text}</p>
                    {target && (
                      <Button to={target} variant="outline" size="sm" className="mt-auto self-start">
                        {s.moreInfo}
                      </Button>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </Container>
        </section>
      ))}

      <CtaBand title={s.accessTitle} text={s.accessText} />
    </>
  )
}
