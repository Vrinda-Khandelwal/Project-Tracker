import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layers3 } from 'lucide-react'
import type { Project } from './lib/types'
import { loadProjects, saveProjects } from './lib/storage'
import { seedProjects } from './lib/seed'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-100 ring-1 ring-inset ring-gray-200">
              <Layers3 className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Project Tracker
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-gray-500">
          Built with Vite + React + TypeScript + Tailwind.
        </div>
      </footer>
    </div>
  )
}


function App() {
  const [projects, setProjects] = useState<Project[]>(() =>
    loadProjects(seedProjects),
  )

  useEffect(() => {
    saveProjects(projects)
  }, [projects])

  const indexById = useMemo(() => {
    const map = new Map<string, number>()
    projects.forEach((p, idx) => map.set(p.id, idx))
    return map
  }, [projects])

  const upsert = (project: Project) => {
    setProjects((prev) => {
      const idx = indexById.get(project.id)
      if (idx === undefined) return [project, ...prev]
      const copy = prev.slice()
      copy[idx] = project
      return copy
    })
  }

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route
            path="/"
            element={<ProjectsPage projects={projects} onCreate={upsert} />}
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailPage projects={projects} onUpdate={upsert} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
