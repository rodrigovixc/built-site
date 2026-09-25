import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { Img } from '@/components/ui/Img'
import { useI18n } from '@/i18n/useI18n'
import { areas, collection } from '@/lib/content'
import { areaPillar, type Pillar } from '@/lib/site'

type Item = { key: string; label: string; href: string; panel?: ReactNode }

const CLOSE_DELAY = 140

/**
 * Barra de navegação para ecrãs grandes. Um indicador desliza por baixo do item sob o
 * cursor e um único painel muda de tamanho e posição entre itens, em vez de fechar e abrir.
 * Teclado: ←/→ entre itens, ↓ entra no painel, Esc fecha.
 */
export function DesktopNav({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const { t, to } = useI18n()
  const { pathname, search } = useLocation()
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const triggers = useRef(new Map<string, HTMLElement>())
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number>(undefined)

  const items: Item[] = [
    { key: 'services', label: t.routes.services, href: to('services'), panel: <ServicesPanel /> },
    { key: 'projects', label: t.routes.projects, href: to('projects'), panel: <ProjectsPanel /> },
    { key: 'knowledge', label: t.nav.knowledge, href: to('insights'), panel: <KnowledgePanel /> },
    { key: 'events', label: t.routes.agenda, href: to('events') },
    { key: 'about', label: t.routes.about, href: to('about'), panel: <AboutPanel /> },
  ]

  // Item da página actual: é onde o indicador repousa quando o cursor sai.
  const current = items.find((i) => {
    const paths = i.key === 'knowledge' ? [to('insights'), to('news'), to('podcast')] : i.key === 'services' ? [to('services'), to('diagnostic')] : [i.href]
    return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  })?.key

  const open = useCallback((key: string | null) => {
    window.clearTimeout(closeTimer.current)
    setActive(key)
  }, [])
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setActive(null)
      setHovered(null)
    }, CLOSE_DELAY)
  }

  // Fecha ao navegar (ajuste de estado durante o render, sem efeito).
  const navKey = pathname + search
  const [seenNav, setSeenNav] = useState(navKey)
  if (seenNav !== navKey) {
    setSeenNav(navKey)
    setActive(null)
    setHovered(null)
  }

  const activeKey = items.find((i) => i.key === active && i.panel)?.key ?? null
  useEffect(() => onOpenChange(activeKey !== null), [activeKey, onOpenChange])
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  // --- Indicador --------------------------------------------------------------------------
  const indicatorKey = hovered ?? active ?? current
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  useLayoutEffect(() => {
    const el = indicatorKey ? triggers.current.get(indicatorKey) : null
    const list = listRef.current
    if (!el || !list) {
      setIndicator(null)
      return
    }
    const a = el.getBoundingClientRect()
    const b = list.getBoundingClientRect()
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 12
    const left = a.left - b.left + pad
    const width = a.width - pad * 2
    setIndicator((prev) => (prev?.left === left && prev.width === width ? prev : { left, width }))
  }, [indicatorKey, t])

  // --- Painel: tamanho e posição animados ----------------------------------------------------
  const activeItem = items.find((i) => i.key === activeKey)
  const [box, setBox] = useState<{ width: number; height: number; x: number } | null>(null)
  useLayoutEffect(() => {
    const content = panelRef.current
    const trigger = activeKey ? triggers.current.get(activeKey) : null
    const list = listRef.current
    if (!content || !trigger || !list) return
    const measure = () => {
      const { width, height } = content.getBoundingClientRect()
      const a = trigger.getBoundingClientRect()
      const b = list.getBoundingClientRect()
      // Centrado no item, sem sair da janela.
      const center = a.left + a.width / 2 - b.left
      const minX = 16 - b.left
      const maxX = window.innerWidth - 16 - b.left - width
      const x = Math.min(Math.max(center - width / 2, minX), maxX)
      // Só actualiza se mudou: o ResizeObserver também dispara por arredondamentos.
      setBox((prev) => (prev && Math.abs(prev.width - width) < 0.5 && Math.abs(prev.height - height) < 0.5 && Math.abs(prev.x - x) < 0.5 ? prev : { width, height, x }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(content)
    return () => ro.disconnect()
  }, [activeKey])

  // --- Teclado --------------------------------------------------------------------------------
  const keys = items.map((i) => i.key)
  const focusTrigger = (key: string) => triggers.current.get(key)?.focus()
  const onTriggerKey = (e: KeyboardEvent, item: Item) => {
    const i = keys.indexOf(item.key)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = keys[(i + (e.key === 'ArrowRight' ? 1 : keys.length - 1)) % keys.length]
      focusTrigger(next)
      setHovered(next)
      if (active) open(items.find((x) => x.key === next)?.panel ? next : null)
    } else if (e.key === 'ArrowDown' && item.panel) {
      e.preventDefault()
      open(item.key)
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('a')?.focus())
    } else if (e.key === 'Escape') {
      open(null)
    }
  }
  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && active) {
      focusTrigger(active)
      open(null)
    }
  }

  return (
    <nav
      aria-label={t.common.mainNav}
      className="relative"
      onPointerLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) open(null)
      }}
    >
      <ul ref={listRef} className="relative flex items-center">
        {items.map((item) => {
          const isOpen = active === item.key
          const common = {
            ref: (el: HTMLElement | null) => {
              if (el) triggers.current.set(item.key, el)
              else triggers.current.delete(item.key)
            },
            onPointerEnter: () => {
              setHovered(item.key)
              open(item.panel ? item.key : null)
            },
            onFocus: () => setHovered(item.key),
            onKeyDown: (e: KeyboardEvent) => onTriggerKey(e, item),
            className: `relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2.5 text-[0.9rem] font-semibold transition-colors xl:px-3 xl:text-[0.92rem] ${
              isOpen || current === item.key ? 'text-ink' : 'text-muted hover:text-ink'
            }`,
          }
          return (
            <li key={item.key}>
              {item.panel ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls="desktop-nav-panel"
                  onClick={() => open(isOpen ? null : item.key)}
                  {...common}
                >
                  {item.label}
                  <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-2.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              ) : (
                <Link to={item.href} aria-current={current === item.key ? 'page' : undefined} {...common}>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
        {/* O indicador: o degradê de "futuro", a deslizar entre itens. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-0.5 h-[3px] rounded-full bg-linear-90 from-blue via-cyan to-green transition-[left,width,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ left: indicator?.left ?? 0, width: indicator?.width ?? 0, opacity: indicator ? 1 : 0 }}
        />
      </ul>

      {/* Painel único: muda de tamanho e desliza para o item activo. */}
      <div
        id="desktop-nav-panel"
        onPointerEnter={() => window.clearTimeout(closeTimer.current)}
        onKeyDown={onPanelKey}
        className={`absolute top-full left-0 pt-4 transition-[opacity,transform] duration-200 ${
          activeItem ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-[0_24px_60px_-20px_var(--shadow-color)] transition-[width,height,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={box ? { width: box.width, height: box.height, transform: `translateX(${box.x}px)` } : undefined}
        >
          <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
          <div ref={panelRef} className="relative w-max">
            {activeItem && (
              <div key={activeItem.key} className="animate-panel-in">
                {activeItem.panel}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// --- Conteúdo dos painéis ----------------------------------------------------------------------

function PanelLink({ to, title, text, accent }: { to: string; title: string; text?: string; accent?: string }) {
  return (
    <Link to={to} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-soft focus-visible:bg-soft">
      {accent && <span aria-hidden="true" className={`mt-1.5 size-2 shrink-0 rounded-full ${accent}`} />}
      <span>
        <span className="block font-display text-[0.95rem] font-bold group-hover:text-blue">{title}</span>
        {text && <span className="mt-0.5 block max-w-[34ch] text-sm leading-snug text-muted">{text}</span>}
      </span>
    </Link>
  )
}

function PanelFooter({ to, label }: { to: string; label: string }) {
  return (
    <div className="border-t border-line px-6 py-3.5">
      <Link to={to} className="text-sm font-bold text-blue hover:underline">
        {label} →
      </Link>
    </div>
  )
}

function ServicesPanel() {
  const { t, to } = useI18n()
  const targets = [to('events'), to('services'), to('diagnostic')]
  const accents = ['bg-blue', 'bg-cyan', 'bg-green']
  return (
    <>
      <div className="grid grid-cols-3 gap-1 p-3">
        {t.home.services.map((s, i) => (
          <PanelLink key={s.title} to={targets[i]} title={s.title} text={s.text} accent={accents[i]} />
        ))}
      </div>
      <PanelFooter to={to('services')} label={t.nav.allServices} />
    </>
  )
}

function ProjectsPanel() {
  const { t, to } = useI18n()
  const byPillar = (p: Pillar) => areas.filter((a) => areaPillar[a.slug] === p)
  return (
    <>
      <div className="grid grid-cols-2 gap-6 p-5">
        {(['digital', 'sustainable'] as const).map((pillar) => (
          <div key={pillar}>
            <p className={`px-3 text-[0.7rem] font-bold tracking-[0.14em] uppercase ${pillar === 'digital' ? 'text-cyan' : 'text-green'}`}>{t.pillars[pillar]}</p>
            <ul className="mt-1">
              {byPillar(pillar).map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`${to('projects')}?area=${a.slug}`}
                    className="flex items-baseline justify-between gap-6 rounded-lg px-3 py-2 font-semibold transition-colors hover:bg-soft hover:text-blue"
                  >
                    {t.areas[a.slug].label}
                    <span className="text-xs text-muted tabular-nums">{a.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <PanelFooter to={to('projects')} label={t.nav.allProjects} />
    </>
  )
}

function KnowledgePanel() {
  const { t, to, locale, formatDate } = useI18n()
  const [latest] = collection('insights', locale)
  return (
    <div className="grid grid-cols-[auto_260px] gap-2 p-3">
      <div>
        <PanelLink to={to('insights')} title={t.routes.insights} text={t.nav.insightsDesc} accent="bg-green" />
        <PanelLink to={to('news')} title={t.routes.news} text={t.nav.newsDesc} accent="bg-blue" />
        <PanelLink to={to('podcast')} title={t.routes.podcast} text={t.nav.podcastDesc} accent="bg-cyan" />
      </div>
      {latest && (
        <Link to={to('insights', latest.slug)} className="group flex flex-col overflow-hidden rounded-xl bg-soft">
          <div className="aspect-[16/9] overflow-hidden bg-white">
            <Img media={latest.image} className="size-full transition duration-500 group-hover:scale-105" />
          </div>
          <div className="p-4">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] text-green uppercase">
              {t.nav.latest} · {formatDate(latest.date)}
            </p>
            <p className="mt-1 line-clamp-3 font-display text-sm leading-snug font-bold group-hover:text-blue">{latest.title}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

function AboutPanel() {
  const { t, to } = useI18n()
  const links = [
    { to: to('about'), title: t.routes.whoWeAre, text: t.nav.whoWeAreDesc },
    { to: to('team'), title: t.routes.team, text: t.nav.teamDesc },
    { to: to('associates'), title: t.routes.associates, text: t.nav.associatesDesc },
    { to: to('governance'), title: t.routes.governance, text: t.nav.governanceDesc },
    { to: to('careers'), title: t.routes.careers, text: t.nav.careersDesc },
  ]
  return (
    <div className="grid grid-cols-2 gap-1 p-3">
      {links.map((l) => (
        <PanelLink key={l.to} {...l} />
      ))}
    </div>
  )
}
