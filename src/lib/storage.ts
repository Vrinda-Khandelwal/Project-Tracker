import type { Project } from './types'

const STORAGE_KEY = 'design-arena.projects.v1'

export function loadProjects(fallback: Project[]): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return fallback
    return parsed as Project[]
  } catch {
    return fallback
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}
