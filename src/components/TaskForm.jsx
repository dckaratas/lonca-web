import { useState } from 'react'
import { EMPTY_TASK, PRIORITIES } from '../interfaces/task'

const TONES = {
  // Parşömen zemin üzerinde
  parchment: {
    input:
      'border-gold-dark/60 bg-white/40 text-ink placeholder:text-ink/50 focus:border-bronze-light focus:ring-bronze-light/30',
    submit: 'bg-ink text-gold-pale hover:bg-umber',
    cancel: 'text-ink/70 hover:bg-ink/10',
  },
  // Koyu kutu üzerinde
  dark: {
    input:
      'border-bronze bg-night/60 text-bone placeholder:text-ash/70 focus:border-gold focus:ring-gold/30',
    submit: 'border border-gold bg-gold/10 text-gold-pale hover:bg-gold/20',
    cancel: 'text-ash hover:bg-bone/10',
  },
}

/** Görev ekleme ve güncelleme formu. `initial` verilirse düzenleme modundadır. */
export default function TaskForm({ initial, onSubmit, onCancel, tone = 'parchment' }) {
  const [form, setForm] = useState({ ...EMPTY_TASK, ...initial })
  const isEdit = Boolean(initial)
  const t = TONES[tone]
  const inputClass = `w-full rounded-[3px] border px-3 py-2 text-base focus:outline-none focus:ring-2 ${t.input}`

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      assignee: form.assignee?.trim() || null,
      reward: Number(form.reward) || 0,
    })
    if (!isEdit) setForm(EMPTY_TASK)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className={inputClass}
        placeholder="Görev başlığı *"
        value={form.title}
        onChange={set('title')}
        required
      />
      <textarea
        className={inputClass}
        placeholder="Açıklama"
        rows={2}
        value={form.description}
        onChange={set('description')}
      />
      <div className="grid grid-cols-3 gap-2">
        <select className={inputClass} value={form.priority} onChange={set('priority')} aria-label="Öncelik">
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.rank} · {p.label}
            </option>
          ))}
        </select>
        <input
          className={inputClass}
          placeholder="Maceracı"
          value={form.assignee ?? ''}
          onChange={set('assignee')}
        />
        <input
          className={inputClass}
          type="number"
          min="0"
          placeholder="Altın"
          value={form.reward}
          onChange={set('reward')}
          aria-label="Altın ödülü"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className={`baslik flex-1 rounded-[3px] px-4 py-2.5 text-sm font-semibold transition-colors ${t.submit}`}
        >
          {isEdit ? 'Kaydet' : 'Panoya As'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={`rounded-[3px] px-4 py-2 text-base ${t.cancel}`}>
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}
