import { Link } from 'react-router'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { Container } from '@/components/ui/Container'
import { useI18n } from '@/i18n/useI18n'
import { contact, legalPages, social } from '@/lib/site'
import { LanguageSwitcher } from './LanguageSwitcher'
import { LogoMark } from './Logo'

export function Footer() {
  const { t, to, page } = useI18n()
  const explore = [
    { label: t.routes.services, to: to('services') },
    { label: t.routes.projects, to: to('projects') },
    { label: t.routes.agenda, to: to('events') },
    { label: t.routes.insights, to: to('insights') },
    { label: t.routes.news, to: to('news') },
    { label: 'Podcast', to: to('podcast') },
    { label: t.routes.careers, to: to('careers') },
  ]
  const legal = legalPages.map((l) => ({ label: t.legal[l.key], to: page(l.slug) }))

  return (
    <footer className="bg-navy pt-18 pb-8 text-[0.92rem] text-mist">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <p className="flex items-center gap-2.5 font-display text-xl font-extrabold text-white">
              <LogoMark /> BUILT CoLAB
            </p>
            <p className="mt-4 max-w-[34ch]">{t.footer.tagline}</p>
            {contact.offices.map((o) => (
              <p key={o.key} className="mt-4">
                <span className="font-semibold text-white">{t.offices[o.key]}</span>
                <br />
                {o.lines.join(', ')}
              </p>
            ))}
            <p className="mt-4 text-white select-all">{contact.email}</p>
          </div>
          <FooterList title={t.footer.explore} links={explore} />
          <FooterList title={t.footer.legal} links={legal} />
          <div>
            <h2 className="mb-4 text-xs font-bold tracking-[0.14em] text-white uppercase">{t.footer.newsletter}</h2>
            <p>{t.footer.newsletterText}</p>
            <NewsletterForm />
            <p className="mt-2 text-xs text-mist/70">
              {t.footer.newsletterConsent}{' '}
              <Link to={page('politica-privacidade')} className="underline">
                {t.footer.privacyPolicy}
              </Link>
              .
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="font-semibold hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-mist/70">
          <span>
            © {new Date().getFullYear()} BUILT CoLAB – {t.footer.rights}
          </span>
          <LanguageSwitcher tone="light" />
          <div className="flex flex-wrap gap-2.5 font-semibold">
            {['PRR', 'Compete 2030', 'União Europeia'].map((f) => (
              <span key={f} className="rounded-md border border-white/15 px-2.5 py-1.5">
                {f}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterList({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="grid gap-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
