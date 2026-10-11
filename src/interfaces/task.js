/**
 * Görev (Task) veri yapısı — lonca-api ile aynı model.
 *
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {'critical'|'high'|'medium'|'low'} priority
 * @property {'open'|'in_progress'|'completed'} status
 * @property {string|null} assignee         Görevi üstlenen maceracı
 * @property {number} reward                Altın ödülü
 * @property {string} createdAt
 * @property {string} [updatedAt]
 */

/** Öncelikler, arayüzde lonca rütbesi (S/A/B/C) olarak gösterilir. Sıra: en yüksekten düşüğe. */
export const PRIORITIES = [
  { value: 'critical', rank: 'S', label: 'Kritik' },
  { value: 'high', rank: 'A', label: 'Yüksek' },
  { value: 'medium', rank: 'B', label: 'Orta' },
  { value: 'low', rank: 'C', label: 'Düşük' },
]

export const STATUSES = [
  { value: 'open', label: 'Açık' },
  { value: 'in_progress', label: 'Sürüyor' },
  { value: 'completed', label: 'Tamamlandı' },
]

/** @type {Omit<Task, 'id' | 'status' | 'createdAt'>} */
export const EMPTY_TASK = {
  title: '',
  description: '',
  priority: 'medium',
  assignee: '',
  reward: 0,
}
