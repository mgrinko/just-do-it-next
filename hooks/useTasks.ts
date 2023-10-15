import { Task } from '@/types/Task'
import { useLocalStorage } from './useLocalStorage'

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])

  const addTask = async (task: Task) => {
    setTasks(current => [...current, task])
  }

  const deleteTask = async (id: number) => {
    setTasks(current => current.filter(task => task.id !== id))
  }

  const updateTask = async (taskToUpdate: Task) => {
    setTasks(
      current => current.map(task => (task.id === taskToUpdate.id ? taskToUpdate : task)),
    )
  }

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
  }
}
