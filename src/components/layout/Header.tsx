import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useScrolled } from '@/hooks/useScrolled'
import { useI18n } from '@/i18n/useI18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MenuOverlay } from './MenuOverlay'

export function Header() {
  const scrolled = useScrolled()
  const { t, to } = useI18n()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition duration-300 ${
          scrolled ? 'bg-surface/88 shadow-[0_1px_0_var(--line)] backdrop-blur-md' : ''
        }`}
      >
        <Container className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.common.openMenu}
            aria-expanded={open}
            className="grid size-11 place-content-center gap-1.5 text-ink"
          >
            <span className="block h-0.5 w-6 rounded bg-current" />
            <span className="block h-0.5 w-6 rounded bg-current" />
            <span className="block h-0.5 w-4 rounded bg-current" />
          </button>
          <Logo />
          <div className="flex items-center justify-end gap-5">
            <span className="hidden sm:block">
              <LanguageSwitcher />
            </span>
            <span className="hidden lg:block">
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
