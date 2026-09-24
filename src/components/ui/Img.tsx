import { useState } from 'react'
import { smallImage } from '@/lib/content'
import type { Media } from '@/lib/types'

/** Imagem com carregamento diferido; sem imagem (ou se falhar), mostra um fundo de marca. */
export function Img({ media, className = '', size = 'sm' }: { media: Media | null; className?: string; size?: 'sm' | 'full' }) {
  const [failed, setFailed] = useState(false)
  if (!media || failed) {
    return <div aria-hidden="true" className={`bg-linear-135 from-navy-2 to-blue ${className}`} />
  }
  return (
    <img
      src={size === 'full' ? media.src : smallImage(media.src)}
      alt={media.alt}
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
