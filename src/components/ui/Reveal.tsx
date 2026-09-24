import { useEffect, useRef, useState, type ComponentProps } from 'react'

/**
 * Sobe ligeiramente quando entra no ecrã. Só esconde o que começa abaixo da dobra,
 * por isso nada fica invisível se o observador não correr.
 */
export function Reveal({ className = '', ...props }: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setHidden(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${hidden ? 'translate-y-7 opacity-0' : ''} ${className}`}
      {...props}
    />
  )
}
