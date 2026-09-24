export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`size-4 ${className}`}>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ExternalArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`size-3.5 ${className}`}>
      <path d="M7 13 13 7M8 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
