import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil } from 'lucide-react'
import type { Project } from '../lib/types'
import { formatDate } from '../lib/utils'
import { StatusBadge } from '../components/StatusBadge'
import { ProjectForm } from '../components/ProjectForm'

export function ProjectDetailPage({
  projects,
  onUpdate,
}: {
  projects: Project[]
  onUpdate: (project: Project) => void
}) {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)

  const project = useMemo(
    () => projects.find((p) => p.id === projectId),
    [projects, projectId],
  )

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white/5 p-6">
          <div className="text-lg font-semibold text-gray-900">Not found</div>
          <p className="mt-2 text-sm text-gray-600">
            This project does not exist (or was removed).
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Projects
          </Link>

          <h1 className="mt-3 truncate text-2xl font-semibold tracking-tight text-gray-900">
            {project.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="text-sm text-gray-600">{project.clientName}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              Updated {formatDate(project.lastUpdated)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setEditing(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
      </div>

      {editing ? (
        <div className="mt-6">
          <ProjectForm
            mode="edit"
            initial={project}
            onCancel={() => setEditing(false)}
            onSave={(updated) => {
              onUpdate(updated)
              setEditing(false)
            }}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          <section className="rounded-2xl border border-gray-200 bg-white/5 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Description
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {project.description}
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white/5 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                Current phase
              </h2>
              <span className="text-sm text-gray-500">
                Status: <span className="text-gray-700">{project.status}</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{project.phase}</p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white/5 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Key notes
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {project.notes}
            </p>
          </section>

          {project.nextAction ? (
            <section className="rounded-2xl border border-gray-200 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                Next action
              </h2>
              <p className="mt-2 text-sm text-gray-700">{project.nextAction}</p>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/20 transition hover:bg-gray-700"
            >
              <Pencil className="h-4 w-4" />
              Update details
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
