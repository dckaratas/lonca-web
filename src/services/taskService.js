/**
 * Görev veri servisi.
 * VITE_API_URL tanımlıysa lonca-api'ye bağlanır, değilse LocalStorage kullanır
 * (Netlify'da backend olmadan da çalışabilmesi için).
 */
import seedTasks from './seedTasks.json'

const API_URL = import.meta.env.VITE_API_URL
const STORAGE_KEY = 'lonca.tasks'

export const usingApi = Boolean(API_URL)

// ---------- LocalStorage ----------
function load() {
  try {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(tasks)) return tasks
  } catch {
    // bozuk veri veya erişim engeli: başlangıç verisine dön
  }
  return seedTasks
}

function save(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // depolama kapalıysa sessizce devam et
  }
}

const local = {
  async list() {
    return load()
  },
  async create(data) {
    const tasks = load()
    const task = {
      ...data,
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      status: 'open',
      createdAt: new Date().toISOString(),
    }
    save([...tasks, task])
    return task
  },
  async update(id, data) {
    const updatedAt = new Date().toISOString()
    save(load().map((t) => (t.id === id ? { ...t, ...data, updatedAt } : t)))
  },
  async remove(id) {
    save(load().filter((t) => t.id !== id))
  },
}

// ---------- REST API ----------
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json()).error || 'İstek başarısız')
  return res.json()
}

const api = {
  list: () => request('/tasks'),
  create: (data) => request('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
}

export default usingApi ? api : local
