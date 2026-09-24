import { Link } from 'react-router'
import { useI18n } from '@/i18n/useI18n'

export function LogoMark({ className = 'size-[30px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="11" height="11" rx="2" className="fill-cyan" />
      <rect x="18" y="3" width="11" height="11" rx="2" fill="currentColor" opacity=".9" />
      <rect x="3" y="18" width="11" height="11" rx="2" fill="currentColor" opacity=".9" />
      <rect x="18" y="18" width="11" height="11" rx="2" className="fill-green" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  const { t, home } = useI18n()
  return (
    <Link to={home} aria-label={t.common.logoHome} className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-lg leading-none font-extrabold tracking-wide whitespace-nowrap sm:text-xl">
        BUILT CoLAB
        <small className="mt-1 hidden font-sans sm:block text-[0.55rem] font-medium tracking-[0.28em] opacity-70">DIGITAL BUILT ENVIRONMENT</small>
      </span>
    </Link>
  )
}
