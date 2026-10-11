import Header from './components/Header'
import TaskBoard from './pages/TaskBoard'
import { usingApi } from './services/taskService'

export default function App() {
  return (
    <>
      <Header usingApi={usingApi} />
      <TaskBoard />
    </>
  )
}
