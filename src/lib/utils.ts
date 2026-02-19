import type { ProjectStatus } from './types'

export function formatDate(iso: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

export function nowIso() {
  return new Date().toISOString()
}

export function statusMeta(status: ProjectStatus): {
  label: ProjectStatus
  badgeClasses: string
} {
  switch (status) {
    case 'Audit':
      return {
        label: status,
        badgeClasses:
          'bg-sky-500/10 text-sky-300 ring-1 ring-inset ring-sky-400/20',
      }
    case 'Optimisation':
      return {
        label: status,
        badgeClasses:
          'bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-400/20',
      }
    case 'Scaling':
      return {
        label: status,
        badgeClasses:
          'bg-fuchsia-500/10 text-fuchsia-300 ring-1 ring-inset ring-fuchsia-400/20',
      }
    case 'Completed':
      return {
        label: status,
        badgeClasses:
          'bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/20',
      }
  }
}

export function clampText(s: string, max = 140) {
  const trimmed = s.trim()
  if (trimmed.length <= max) return trimmed
  return trimmed.slice(0, max - 1) + '…'
}
