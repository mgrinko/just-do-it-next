import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { getLists } from '@/actions/list.actions'
import { getUser } from '@/actions/user.actions'
import { ListOfLists } from '@/components/ListOfLists'
import { getAppServerSession } from '@/utils/authOptions'
import { Sidebar } from './Sidebar'

type Props = { children: React.ReactNode }

export default async function Layout({ children }: Props) {
  const session = await getAppServerSession()

  if (!session || !session.user) {
    return redirect('/')
  }

  const user = await getUser(session.user.email || '')

  if (!user) {
    signOut()
    return redirect('/')
  }

  const lists = await getLists(user.id)

  return (
    <div className="columns">
      <div className="column">
        <div className="box">
          <div className="block is-flex is-justify-content-space-between">
            <h1 className="title">Just Do It!</h1>

            <Link href="/lists/new" className="button is-link is-light">
              Add a List
            </Link>
          </div>

          {lists.length > 0 ? (
            <ListOfLists lists={lists} />
          ) : (
            <p>You don&apos;t have list yet</p>
          )}
        </div>
      </div>

      <Sidebar>{children}</Sidebar>
    </div>
  )
}
