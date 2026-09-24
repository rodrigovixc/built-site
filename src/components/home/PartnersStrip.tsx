import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useI18n } from '@/i18n/useI18n'
import { associates } from '@/lib/content'

/** Logótipos dos associados em faixa contínua, a cinzento até passar o rato. */
export function PartnersStrip() {
  const { t, to } = useI18n()
  const row = associates.filter((a) => a.logo)
  return (
    <section aria-labelledby="associados-title" className="border-y border-line py-14">
      <Container className="text-center">
        <Eyebrow className="text-muted">
          <Link id="associados-title" to={to('associates')} className="hover:text-ink">
            {t.home.partners}
          </Link>
        </Eyebrow>
      </Container>
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-ticker items-center gap-14 hover:[animation-play-state:paused]">
          {[...row, ...row].map((a, i) => (
            <li key={`${a.id}-${i}`} aria-hidden={i >= row.length}>
              <img
                src={a.logo!}
                alt={a.name}
                loading="lazy"
                className="h-12 w-auto max-w-40 object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
