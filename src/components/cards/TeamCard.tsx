import { ExternalArrow } from '@/components/ui/Arrow'
import { useI18n } from '@/i18n/useI18n'
import type { TeamMember } from '@/lib/types'

export function TeamCard({ member }: { member: TeamMember }) {
  const { t } = useI18n()
  return (
    <article className="group">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-soft">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="size-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="grid size-full place-items-center font-display text-5xl font-extrabold text-blue/30">
            {member.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
      <p className="text-sm text-muted">{t.team.roles[member.role] ?? member.role}</p>
      <div className="mt-2 flex gap-4 text-sm font-semibold text-blue">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            LinkedIn <ExternalArrow />
          </a>
        )}
        {member.orcid && (
          <a href={member.orcid} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            ORCID <ExternalArrow />
          </a>
        )}
      </div>
    </article>
  )
}
