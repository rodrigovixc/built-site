import { NavLink } from 'react-router'
import { Container } from '@/components/ui/Container'
import { useI18n } from '@/i18n/useI18n'

/** Separadores das páginas "O Built". */
export function AboutNav() {
  const { t, to } = useI18n()
  const links = [
    { label: t.routes.whoWeAre, to: to('about') },
    { label: t.routes.team, to: to('team') },
    { label: t.routes.associates, to: to('associates') },
    { label: t.routes.governance, to: to('governance') },
    { label: t.routes.careers, to: to('careers') },
  ]
  return (
    <nav aria-label={t.menu.groupAbout} className="sticky top-[calc(76px+env(safe-area-inset-top))] z-30 border-b border-line bg-surface/90 backdrop-blur-md">
      <Container className="flex gap-1 overflow-x-auto py-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            className={({ isActive }) =>
              `shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-ink text-surface' : 'text-muted hover:bg-soft hover:text-ink'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </Container>
    </nav>
  )
}
