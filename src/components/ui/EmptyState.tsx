import type { ReactNode } from 'react'

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <p className="font-display text-xl font-bold">{title}</p>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </div>
  )
}
