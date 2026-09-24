import { Link, useLocation } from 'react-router'
import { useI18n } from '@/i18n/useI18n'

/** Paginação numérica por ?page=N, mantendo os outros parâmetros. */
export function Pagination({ page, pages }: { page: number; pages: number }) {
  const { pathname, search } = useLocation()
  const { t } = useI18n()
  if (pages <= 1) return null

  const href = (n: number) => {
    const params = new URLSearchParams(search)
    if (n === 1) params.delete('page')
    else params.set('page', String(n))
    const q = params.toString()
    return `${pathname}${q ? `?${q}` : ''}`
  }

  const numbers = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1)

  return (
    <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label={t.common.pagination}>
      {page > 1 && (
        <Link to={href(page - 1)} className="rounded-lg px-4 py-2 font-semibold text-blue hover:bg-soft">
          {t.common.previous}
        </Link>
      )}
      {numbers.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - numbers[i - 1] > 1 && <span className="text-muted">…</span>}
          <Link
            to={href(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`grid size-10 place-items-center rounded-lg font-semibold tabular-nums ${n === page ? 'bg-blue text-white' : 'hover:bg-soft'}`}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < pages && (
        <Link to={href(page + 1)} className="rounded-lg px-4 py-2 font-semibold text-blue hover:bg-soft">
          {t.common.next}
        </Link>
      )}
    </nav>
  )
}
