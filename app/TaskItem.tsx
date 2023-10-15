'use client'

import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../types/Task'

export type Props = {
  task: Task
  isProcessed: boolean
  onUpdate?: (task: Task) => Promise<void>
  onDelete?: () => Promise<void>
}

export const TaskItem: React.FC<Props> = ({
  task,
  isProcessed,
  onDelete = () => Promise.resolve(),
  onUpdate = () => Promise.resolve(),
}) => {
  const field = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  useEffect(() => {
    if (field.current) {
      field.current.focus()
    }
  }, [editing])

  function save() {
    if (isProcessed) {
      return
    }

    const trimmedTitle = title.trim()

    if (trimmedTitle === task.title) {
      setEditing(false)

      return
    }

    if (trimmedTitle) {
      onUpdate({ ...task, title: trimmedTitle })
        .then(() => setEditing(false))
        .catch(() => field.current?.focus())
    } else {
      onDelete()
        .then(() => setEditing(false))
        .catch(() => field.current?.focus())
    }
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    save()
  }

  return (
    <div
      data-cy="Task"
      className={classNames('task', { completed: task.completed })}
    >
      <label className="task__status-label">
        <input
          data-cy="TaskStatus"
          type="checkbox"
          className="task__status"
          checked={task.completed}
          onChange={() => {
            onUpdate({ ...task, completed: !task.completed }).catch(() => {})
          }}
        />
      </label>

      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            data-cy="TaskTitleField"
            ref={field}
            type="text"
            className="task__title-field"
            placeholder="Empty task will be deleted"
            defaultValue={task.title}
            onChange={event => setTitle(event.target.value)}
            onBlur={save}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditing(false)
              }
            }}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TaskTitle"
            className="task__title"
            onDoubleClick={() => setEditing(true)}
          >
            {task.title}
          </span>

          <button
            type="button"
            className="task__remove"
            data-cy="TaskDelete"
            onClick={() => onDelete().catch(() => {})}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TaskLoader"
        className={classNames('modal overlay', {
          'is-active': isProcessed,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  )
}
