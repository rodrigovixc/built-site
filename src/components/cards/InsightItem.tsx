import { Link } from 'react-router'

/** Linha compacta de conteúdo: tipo à esquerda, título à direita. */
export function InsightItem({ kind, title, to }: { kind: string; title: string; to: string }) {
  return (
    <Link to={to} className="group grid grid-cols-[92px_1fr] items-start gap-4 border-b border-line py-5">
      <span className="pt-1 text-[0.7rem] font-bold tracking-[0.12em] text-green uppercase">{kind}</span>
      <span className="font-display text-[1.05rem] leading-snug font-semibold group-hover:text-blue">{title}</span>
    </Link>
  )
}
