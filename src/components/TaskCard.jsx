import { useState } from 'react'
import { STATUSES } from '../interfaces/task'
import TaskForm from './TaskForm'
import PriorityBadge from './PriorityBadge'

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <article className="kutu p-4">
        <TaskForm
          tone="dark"
          initial={task}
          onSubmit={(data) => {
            onUpdate(task.id, data)
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
        />
      </article>
    )
  }

  return (
    <article className="kutu group p-4 transition-colors hover:border-bronze-light">
      <div className="flex items-start gap-3">
        <PriorityBadge priority={task.priority} />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl leading-snug font-semibold text-bone group-hover:text-gold-pale">{task.title}</h3>
          {task.description && <p className="mt-1 text-base text-ash">{task.description}</p>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-base">
        <span className="text-gold">🪙 {task.reward} altın</span>
        <span className="italic text-ash">{task.assignee || 'Atanmadı'}</span>
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-bronze/60 pt-3">
        <select
          className="rounded-[3px] border border-bronze bg-night/60 px-2 py-1 text-sm text-bone focus:border-gold focus:outline-none"
          value={task.status}
          onChange={(e) => onUpdate(task.id, { status: e.target.value })}
          aria-label="Durum"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button onClick={() => setEditing(true)} className="ml-auto text-base text-gold hover:text-gold-pale">
          Düzenle
        </button>
        <button
          onClick={() => confirm(`"${task.title}" görevi silinsin mi?`) && onDelete(task.id)}
          className="text-base text-ash hover:text-red-300"
        >
          Sil
        </button>
      </div>
    </article>
  )
}
