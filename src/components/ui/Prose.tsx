import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import { useI18n } from '@/i18n/useI18n'
import type { Body } from '@/lib/types'

/**
 * HTML do WordPress (já limpo). As ligações internas estão escritas em caminhos PT:
 * aqui passam para o idioma actual e navegam sem recarregar. As externas abrem noutro separador.
 */
export function Prose({ html, className = '' }: { html: string; className?: string }) {
  const navigate = useNavigate()
  const { localize } = useI18n()

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a')
    const href = a?.getAttribute('href')
    if (!a || !href || e.metaKey || e.ctrlKey || e.shiftKey) return
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/media/')) {
      e.preventDefault()
      navigate(localize(href))
    } else if (/^https?:/.test(href)) {
      a.target = '_blank'
      a.rel = 'noreferrer'
    }
  }

  return <div className={`prose-cms ${className}`} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
}

export function ProseSkeleton() {
  const { t } = useI18n()
  return (
    <div className="max-w-[70ch] animate-pulse space-y-4" aria-label={t.common.loading}>
      {[100, 92, 96, 70, 100, 85].map((w, i) => (
        <div key={i} className="h-4 rounded bg-soft" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

/** Corpo com o aviso de tradução automática ou de versão original, quando se aplica. */
export function BodyContent({ body, fallbackText }: { body: Body | null | undefined; fallbackText: string }) {
  const { t } = useI18n()
  if (body === undefined) return <ProseSkeleton />
  if (!body) return <p className="text-muted">{fallbackText}</p>
  const notice = body.fallback ? t.common.fallbackNotice : body.machine ? t.common.machineNotice : ''
  return (
    <>
      {notice && <p className="mb-8 max-w-[70ch] rounded-xl border border-line bg-soft px-4 py-3 text-sm text-muted">{notice}</p>}
      <Prose html={body.content} />
    </>
  )
}
