import { Task } from '@prisma/client'
import { useLocalStorage } from './useLocalStorage'

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])

  const getTasks = async () => {
    return tasks;
  }

  const addTask = async (task: Task) => {
    setTasks(current => [...current, task])
    return task
  }

  const deleteTask = async (id: number) => {
    setTasks(current => current.filter(task => task.id !== id))
  }

  const updateTask = async (taskToUpdate: Task) => {
    setTasks(
      current => current.map(task => (task.id === taskToUpdate.id ? taskToUpdate : task)),
    )
    return taskToUpdate
  }

  return {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
  }
}
