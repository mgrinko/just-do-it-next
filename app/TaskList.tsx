'use client'

import classNames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import React, { useEffect, useRef, useState } from 'react'
import { TaskItem } from './TaskItem'
import { Task } from '@/types/Task'
import { useTasks } from '@/hooks/useTasks'

export function TaskList() {
  // Unauthorizaed user
  const userId = 0

  const [title, setTitle] = useState('')
  const titleField = useRef<HTMLInputElement>(null)

  const [errorMessage, setErrorMessage] = useState('')
  const [type, setType] = useState<'all' | 'active' | 'completed'>('all')
  const [creating, setCreating] = useState(false)
  const [processings, setProcessings] = useState<number[]>([])
  const { tasks, ...taskService } = useTasks()

  const addProcessing = (id: number) => {
    setProcessings(current => [...current, id])
  }

  const removeProcessing = (idToRemove: number) => {
    setProcessings(current => current.filter(id => id !== idToRemove))
  }

  const timerId = useRef(0);

  function showError(message: string) {
    clearTimeout(timerId.current)

    setErrorMessage(message)

    if (!message) {
      return
    }

    timerId.current = +setTimeout(() => setErrorMessage(''), 3000)
  }

  useEffect(() => {
    if (!creating) {
      titleField.current?.focus()
    }
  }, [creating])

  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!title.trim()) {
      showError('Title should not be empty')

      return
    }

    showError('')
    setCreating(true)

    taskService
      .addTask({
        id: Math.random(),
        title: title.trim(),
        completed: false,
        userId,
      })
      .then(() => setTitle(''))
      .catch(() => showError('Unable to add a task'))
      .finally(() => setCreating(false))
  }

  const deleteTask = async (taskId: number) => {
    addProcessing(taskId)
    showError('')

    return taskService
      .deleteTask(taskId)
      .catch(error => {
        showError('Unable to delete a task')
        throw error
      })
      .finally(() => {
        removeProcessing(taskId)
        titleField.current?.focus()
      })
  }

  const updateTask = async (updatedTask: Task) => {
    addProcessing(updatedTask.id)
    showError('')

    return taskService
      .updateTask(updatedTask)
      .catch(error => {
        showError('Unable to update a task')
        throw error
      })
      .finally(() => removeProcessing(updatedTask.id))
  }

  const clearCompleted = () => {
    completedTasks.forEach(({ id }) => deleteTask(id).catch(() => {}))
  }

  const toggleAll = () => {
    const allCompleted = activeTasks.length === 0
    const tasksToToggle = allCompleted ? completedTasks : activeTasks

    tasksToToggle.forEach(task => {
      updateTask({ ...task, completed: !allCompleted }).catch(() => {})
    })
  }

  const visibleTasks = tasks.filter(task => {
    switch (type) {
      case 'active':
        return !task.completed

      case 'completed':
        return task.completed

      default:
        return true
    }
  })

  return (
    <div className="taskapp">
      <h1 className="taskapp__title has-text-success">tasks</h1>

      <div className="taskapp__content">
        <header className="taskapp__header">
          {tasks.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames('taskapp__toggle-all', {
                active: activeTasks.length === 0,
              })}
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTaskField"
              type="text"
              className="taskapp__new-task"
              placeholder="What needs to be done?"
              ref={titleField}
              disabled={creating}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        <section className="taskapp__main" data-cy="TaskList">
          <TransitionGroup>
            {visibleTasks.map(task => (
              <CSSTransition key={task.id} timeout={300} classNames="item">
                <TaskItem
                  task={task}
                  isProcessed={processings.includes(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onUpdate={updateTask}
                />
              </CSSTransition>
            ))}

            {creating && (
              <CSSTransition key={0} timeout={300} classNames="temp-item">
                <TaskItem
                  task={{
                    id: Math.random(),
                    title,
                    completed: false,
                    userId,
                  }}
                  isProcessed
                />
              </CSSTransition>
            )}
          </TransitionGroup>
        </section>

        {(tasks.length > 0 || creating) && (
          <footer className="taskapp__footer" data-cy="Footer">
            <span className="task-count" data-cy="TasksCounter">
              {`${activeTasks.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                onClick={() => setType('all')}
                className={classNames('filter__link', {
                  selected: type === 'all',
                })}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                onClick={() => setType('active')}
                className={classNames('filter__link', {
                  selected: type === 'active',
                })}
              >
                Active
              </a>

              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                onClick={() => setType('completed')}
                className={classNames('filter__link', {
                  selected: type === 'completed',
                })}
              >
                Completed
              </a>
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="taskapp__clear-completed"
              disabled={completedTasks.length === 0}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => showError('')}
        />

        {errorMessage}
      </div>
    </div>
  )
}
