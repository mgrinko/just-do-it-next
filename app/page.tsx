'use client'

import { redirect } from 'next/navigation'
import { TaskList } from '../components/TaskList'
import { useSession } from 'next-auth/react'
import { useTasks } from '@/hooks/useTasks'
import { Loader } from '@/components/Loader'

export default function Home() {
  const taskService = useTasks()
  const session = useSession()

  if (session.status === 'loading') return <Loader />;
  if (session.status === 'authenticated') return redirect('/lists')

  return (
    <div className="box">
      <h1 className="title">Just Do It!</h1>

      <TaskList taskService={taskService} />
    </div>
  )
}

