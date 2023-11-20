import { getListById } from '@/actions/list.actions'
import * as taskService from '@/actions/task.actions'
import { getUser } from '@/actions/user.actions'
import { TaskList } from '@/components/TaskList'
import { getAppServerSession } from '@/utils/authOptions'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Page({ params = { id: '' } }) {
  const listId = +params.id;
  const session = await getAppServerSession()
  const user = await getUser(session?.user?.email || '')

  if (!user) return signIn()

  const list = await getListById(listId)

  if (!list) return redirect('/lists')

  return (
    <>
      <div className="block is-flex is-justify-content-space-between">
        <h2 className="title is-4">{list.title}:</h2>
        <Link href="/lists" className="delete is-medium" />
      </div>

      <TaskList listId={listId} taskService={taskService} />
    </>
  )
}
