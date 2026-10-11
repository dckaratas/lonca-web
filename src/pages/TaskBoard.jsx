import { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import { PRIORITIES, STATUSES } from '../interfaces/task'
import taskService from '../services/taskService'

const priorityOrder = (task) => PRIORITIES.findIndex((p) => p.value === task.priority)

export default function TaskBoard() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  const run = async (action) => {
    try {
      setError(null)
      await action()
      setTasks(await taskService.list())
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    taskService
      .list()
      .then(setTasks)
      .catch((e) => setError(e.message))
  }, [])

  const handleCreate = (data) => run(() => taskService.create(data))
  const handleUpdate = (id, data) => run(() => taskService.update(id, data))
  const handleDelete = (id) => run(() => taskService.remove(id))

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <section className="parsomen mx-auto mb-12 max-w-xl px-6 py-6">
        <h2 className="baslik mb-4 text-center text-lg font-semibold text-bronze">Yeni Görev İlanı</h2>
        <TaskForm onSubmit={handleCreate} />
      </section>

      {error && (
        <p className="mb-6 rounded-[3px] border border-red-900 bg-red-950/60 p-3 text-center text-base text-red-200">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {STATUSES.map((status) => {
          const column = tasks
            .filter((t) => t.status === status.value)
            .sort((a, b) => priorityOrder(a) - priorityOrder(b))
          return (
            <section key={status.value}>
              <h2 className="baslik mb-4 flex items-center justify-between border-b border-bronze pb-2 text-lg text-gold-pale">
                {status.label}
                <span className="rounded-full border border-bronze bg-night/70 px-2.5 font-serif text-sm tracking-normal text-gold">
                  {column.length}
                </span>
              </h2>
              <div className="space-y-3">
                {column.map((task) => (
                  <TaskCard key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
                ))}
                {column.length === 0 && (
                  <p className="rounded-[5px] border border-dashed border-bronze p-4 text-center text-base italic text-ash/70">
                    Bu sütunda görev yok
                  </p>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
