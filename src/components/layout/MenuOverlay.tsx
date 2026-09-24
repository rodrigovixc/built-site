import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { ExternalArrow } from '@/components/ui/Arrow'
import { Container } from '@/components/ui/Container'
import { useI18n } from '@/i18n/useI18n'
import { contact, external } from '@/lib/site'
import { LanguageSwitcher } from './LanguageSwitcher'
import { LogoMark } from './Logo'

type Item = { label: string; to: string; external?: boolean }

/** Menu em ecrã inteiro, o único momento escuro do topo. */
export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, to, home } = useI18n()
  const { pathname, hash } = useLocation()
  const closeRef = useRef<HTMLButtonElement>(null)

  // Fecha ao mudar de página.
  useEffect(() => onClose(), [pathname, hash, onClose])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const main: Item[] = [
    { label: t.routes.services, to: to('services') },
    { label: t.routes.areas, to: `${home}#areas` },
    { label: t.routes.projects, to: to('projects') },
    { label: t.routes.events, to: to('events') },
    { label: t.routes.insights, to: to('insights') },
    { label: t.routes.news, to: to('news') },
    { label: t.routes.about, to: to('about') },
  ]
  const groups: { label: string; links: Item[] }[] = [
    {
      label: t.menu.groupAbout,
      links: [
        { label: t.routes.whoWeAre, to: to('about') },
        { label: t.routes.team, to: to('team') },
        { label: t.routes.associates, to: to('associates') },
        { label: t.routes.governance, to: to('governance') },
        { label: t.routes.careers, to: to('careers') },
      ],
    },
    {
      label: t.menu.groupPlatforms,
      links: [
        { label: t.menu.digitalbuilt, to: to('services') },
        { label: t.routes.podcast, to: to('podcast') },
        { label: t.menu.research, to: external.research, external: true },
        { label: t.menu.circularity, to: external.circularity, external: true },
      ],
    },
  ]

  return (
    <div role="dialog" aria-modal="true" aria-label={t.common.menu} className="fixed inset-0 z-50 overflow-auto bg-navy pt-[env(safe-area-inset-top)] pb-8 text-white">
      <Container>
        <div className="flex h-[76px] items-center justify-between">
          <span className="flex items-center gap-2.5 font-display text-xl font-extrabold">
            <LogoMark /> BUILT CoLAB
          </span>
          <div className="flex items-center gap-4">
            <LanguageSwitcher tone="light" />
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.common.closeMenu} className="grid size-11 place-items-center text-3xl">
              ×
            </button>
          </div>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <nav aria-label={t.common.mainNav}>
            {main.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-white/10 py-1.5 font-display text-3xl leading-tight font-bold transition-all hover:pl-2.5 hover:text-cyan md:text-5xl"
              >
                {l.label}
                <span className="text-base opacity-50 transition group-hover:opacity-100">→</span>
              </Link>
            ))}
          </nav>
          <div className="grid content-start gap-8">
            {groups.map((g) => (
              <div key={g.label}>
                <h2 className="mb-3 text-xs font-bold tracking-[0.14em] text-mist/70 uppercase">{g.label}</h2>
                <ul className="grid gap-2 text-mist">
                  {g.links.map((l) =>
                    l.external ? (
                      <li key={l.to}>
                        <a href={l.to} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                          {l.label} <ExternalArrow />
                        </a>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <Link to={l.to} onClick={onClose} className="hover:text-white">
                          {l.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="mb-3 text-xs font-bold tracking-[0.14em] text-mist/70 uppercase">{t.menu.groupContact}</h2>
              <p className="text-mist select-all">{contact.email}</p>
              <p className="text-mist">{t.menu.cities}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
