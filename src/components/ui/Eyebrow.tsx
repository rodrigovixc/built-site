import type { ReactNode } from 'react'

export function Eyebrow({ children, className = 'text-blue' }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-bold tracking-[0.14em] uppercase ${className}`}>{children}</p>
}
