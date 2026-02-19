import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import type { Project } from '../lib/types'
import { clampText, formatDate } from '../lib/utils'
import { StatusBadge } from '../components/StatusBadge'
import { ProjectForm } from '../components/ProjectForm'

export function ProjectsPage({
  projects,
  onCreate,
}: {
  projects: Project[]
  onCreate: (project: Project) => void
}) {
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      )
    })
  }, [projects, query])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Projects
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            View status, last updates, and key details. Add or edit as needed.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-800 sm:w-72"
            />
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            <Plus className="h-4 w-4" />
            Add project
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
            No projects found.
          </div>
        ) : (
          filtered
            .slice()
            .sort(
              (a, b) =>
                new Date(b.lastUpdated).getTime() -
                new Date(a.lastUpdated).getTime(),
            )
            .map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="group rounded-2xl border border-gray-200 bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/7"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-base font-semibold text-gray-900">
                        {p.name}
                      </h2>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {p.clientName}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      {clampText(p.description, 160)}
                    </div>
                  </div>

                  <div className="shrink-0 text-sm text-gray-500">
                    <div className="text-xs uppercase tracking-wide text-gray-400">
                      Last updated
                    </div>
                    <div className="mt-1 font-medium text-gray-700">
                      {formatDate(p.lastUpdated)}
                    </div>
                  </div>
                </div>
              </Link>
            ))
        )}
      </div>

      {showAdd ? (
        <div className="mt-6">
          <ProjectForm
            mode="create"
            onCancel={() => setShowAdd(false)}
            onSave={(project) => {
              onCreate(project)
              setShowAdd(false)
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
