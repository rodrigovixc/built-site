import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useScrolled } from '@/hooks/useScrolled'
import { useI18n } from '@/i18n/useI18n'
import { DesktopNav } from './DesktopNav'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MenuOverlay } from './MenuOverlay'

/**
 * Até 1024 px: menu sanduíche + logótipo ao centro + menu em ecrã inteiro.
 * A partir de 1024 px: logótipo à esquerda e a barra DesktopNav com painéis;
 * o botão de contacto só a partir de 1280 px, para a barra caber em qualquer idioma.
 */
export function Header() {
  const scrolled = useScrolled()
  const { t, to } = useI18n()
  const [open, setOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const solid = scrolled || panelOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition duration-300 ${
          solid ? 'bg-surface/90 shadow-[0_1px_0_var(--line)] backdrop-blur-md' : ''
        }`}
      >
        <Container className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center lg:flex lg:justify-between lg:gap-4 xl:gap-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.common.openMenu}
            aria-expanded={open}
            className="grid size-11 place-content-center gap-1.5 text-ink lg:hidden"
          >
            <span className="block h-0.5 w-6 rounded bg-current" />
            <span className="block h-0.5 w-6 rounded bg-current" />
            <span className="block h-0.5 w-4 rounded bg-current" />
          </button>
          <Logo />
          <div className="hidden lg:block">
            <DesktopNav onOpenChange={setPanelOpen} />
          </div>
          <div className="flex items-center justify-end gap-5 lg:gap-4 xl:gap-5">
            <span className="hidden sm:block">
              <LanguageSwitcher />
            </span>
            <span className="hidden xl:block">
              <Button to={to('contact')} size="sm">
                {t.common.contactUs}
              </Button>
            </span>
          </div>
        </Container>
      </header>
      <MenuOverlay open={open} onClose={close} />
    </>
  )
}
