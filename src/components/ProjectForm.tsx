import { useMemo, useState } from 'react'
import type { Project, ProjectStatus } from '../lib/types'
import { nowIso } from '../lib/utils'
import { TextField } from './TextField'

const statuses: ProjectStatus[] = [
  'Audit',
  'Optimisation',
  'Scaling',
  'Completed',
]

function slugId(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
  return `p_${base || 'project'}_${Math.random().toString(16).slice(2, 8)}`
}

export function ProjectForm({
  initial,
  mode,
  onCancel,
  onSave,
}: {
  initial?: Project
  mode: 'create' | 'edit'
  onCancel: () => void
  onSave: (project: Project) => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [clientName, setClientName] = useState(initial?.clientName ?? '')
  const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? 'Audit')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [phase, setPhase] = useState(initial?.phase ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [nextAction, setNextAction] = useState(initial?.nextAction ?? '')

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Project name is required.'
    if (!clientName.trim()) e.clientName = 'Client/Startup name is required.'
    if (!description.trim()) e.description = 'Description is required.'
    if (!phase.trim()) e.phase = 'Current phase is required.'
    if (!notes.trim()) e.notes = 'Key notes are required.'
    return e
  }, [name, clientName, description, phase, notes])

  const canSave = Object.keys(errors).length === 0

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/5 p-5 shadow-[0_12px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'create' ? 'Add Project' : 'Edit Project'}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Basic fields only; stored in your browser (localStorage).
          </p>
        </div>
        <button
          onClick={onCancel}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TextField label="Project name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
            placeholder="e.g. Growth Audit Q1"
          />
          {errors.name ? (
            <span className="text-xs text-rose-300">{errors.name}</span>
          ) : null}
        </TextField>

        <TextField label="Client / Startup">
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
            placeholder="e.g. Acme Ventures"
          />
          {errors.clientName ? (
            <span className="text-xs text-rose-300">{errors.clientName}</span>
          ) : null}
        </TextField>

        <TextField label="Current status">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className="w-full rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="bg-white/5 text-gray-900">
                {s}
              </option>
            ))}
          </select>
        </TextField>

        <TextField label="Current phase">
          <input
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
            placeholder="e.g. Discovery + Audit"
          />
          {errors.phase ? (
            <span className="text-xs text-rose-300">{errors.phase}</span>
          ) : null}
        </TextField>

        <div className="md:col-span-2">
          <TextField label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
              placeholder="What is this project about?"
            />
            {errors.description ? (
              <span className="text-xs text-rose-300">{errors.description}</span>
            ) : null}
          </TextField>
        </div>

        <div className="md:col-span-2">
          <TextField label="Key notes" hint="Free-form notes. Keep it concise.">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
              placeholder="Important context, decisions, risks, links, etc."
            />
            {errors.notes ? (
              <span className="text-xs text-rose-300">{errors.notes}</span>
            ) : null}
          </TextField>
        </div>

        <div className="md:col-span-2">
          <TextField label="Next action (optional)">
            <input
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-black/20 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300/30"
              placeholder="e.g. Schedule stakeholder workshop"
            />
          </TextField>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">
          {mode === 'edit' ? 'Saving will update the Last updated date.' : null}
        </div>
        <button
          disabled={!canSave}
          onClick={() => {
            const project: Project = {
              id: initial?.id ?? slugId(name),
              name: name.trim(),
              clientName: clientName.trim(),
              status,
              lastUpdated: nowIso(),
              description: description.trim(),
              phase: phase.trim(),
              notes: notes.trim(),
              nextAction: nextAction.trim() ? nextAction.trim() : undefined,
            }
            onSave(project)
          }}
          className="inline-flex items-center justify-center rounded-xl bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/20 transition enabled:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mode === 'create' ? 'Add project' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
