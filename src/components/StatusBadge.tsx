import type { ProjectStatus } from '../lib/types'
import { statusMeta } from '../lib/utils'

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = statusMeta(status)
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${meta.badgeClasses}`}
      aria-label={`Status: ${meta.label}`}
    >
      {meta.label}
    </span>
  )
}
