export type ProjectStatus = 'Audit' | 'Optimisation' | 'Scaling' | 'Completed'

export type Project = {
  id: string
  name: string
  clientName: string
  status: ProjectStatus
  lastUpdated: string // ISO string
  description: string
  phase: string
  notes: string
  nextAction?: string
}
