import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useI18n } from '@/i18n/useI18n'
import { contact } from '@/lib/site'

export function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { t, to } = useI18n()
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="relative grid items-center gap-10 overflow-hidden rounded-3xl bg-linear-120 from-blue via-navy-2 via-60% to-navy px-6 py-12 text-white md:grid-cols-[1.4fr_1fr] md:px-14 md:py-18">
          <span aria-hidden="true" className="absolute -inset-y-10 -right-16 w-2/5 -skew-x-[14deg] bg-linear-135 from-cyan to-green opacity-25" />
          <div className="relative">
            <h2 className="text-4xl font-extrabold md:text-5xl">{title ?? t.home.ctaTitle}</h2>
            <p className="mt-3.5 text-mist">{text ?? t.home.ctaText}</p>
          </div>
          <div className="relative flex flex-wrap gap-3 md:justify-end">
            <Button to={to('diagnostic')} variant="light">
              {t.home.ctaButton}
            </Button>
            <Button to={to('contact')} variant="ghost-light">
              {contact.email}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
