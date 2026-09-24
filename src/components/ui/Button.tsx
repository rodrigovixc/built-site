import type { ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'outline' | 'ghost-light' | 'light'
type Size = 'md' | 'sm'

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-2 hover:-translate-y-0.5',
  outline: 'text-ink ring-[1.5px] ring-inset ring-ink hover:bg-ink hover:text-surface',
  'ghost-light': 'text-white ring-[1.5px] ring-inset ring-white/50 hover:ring-white',
  light: 'bg-white text-navy hover:-translate-y-0.5',
}

const sizes: Record<Size, string> = { md: 'px-6 py-3.5 text-[0.95rem]', sm: 'px-5 py-2.5 text-sm' }

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode }
type Props =
  | (Common & { to: string; href?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & { href: string; to?: never; onClick?: never; type?: never; disabled?: never })
  | (Common & { to?: never; href?: never; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean })

/** Um só botão para <Link>, <a> externo e <button>. */
export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: Props) {
  const cls = `inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`
  if (rest.to !== undefined) {
    return (
      <Link to={rest.to} className={cls}>
        {children}
      </Link>
    )
  }
  if (rest.href !== undefined) {
    return (
      <a href={rest.href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button type={rest.type ?? 'button'} onClick={rest.onClick} disabled={rest.disabled} className={cls}>
      {children}
    </button>
  )
}
