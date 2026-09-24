import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useI18n } from '@/i18n/useI18n'
import { ScanCanvas } from './ScanCanvas'

export function Hero() {
  const { t, to } = useI18n()
  const h = t.home
  return (
    <section className="relative flex min-h-[min(820px,100svh)] items-end overflow-hidden pt-36 pb-18">
      <div aria-hidden="true" className="blueprint absolute inset-0 [mask-image:radial-gradient(60%_70%_at_72%_45%,black,transparent)]" />
      <ScanCanvas className="absolute inset-0 size-full opacity-30 lg:opacity-100" />
      <Container className="relative">
        <Eyebrow>{h.heroEyebrow}</Eyebrow>
        <h1 className="mt-5 text-[clamp(3rem,11vw,9.5rem)] leading-[0.9] font-extrabold tracking-tight uppercase">
          {h.heroLine1}
          <br />
          {h.heroLine2}{' '}
          <em className="bg-linear-90 from-blue via-cyan via-55% to-green bg-clip-text text-transparent not-italic">{h.heroAccent}</em>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="text-xl font-bold md:text-3xl">{h.heroSubtitle}</h2>
            <p className="mt-2 max-w-[52ch] text-muted">{h.heroText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to={to('diagnostic')}>{h.heroCta}</Button>
            <Button to={to('projects')} variant="outline">
              {h.heroSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
