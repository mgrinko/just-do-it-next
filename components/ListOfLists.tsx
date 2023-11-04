'use client'

import Link from 'next/link'
import { redirect, useParams } from 'next/navigation'
import { List } from '@prisma/client'
import classNames from 'classnames'

import { deleteList } from '@/actions/list.actions'

type Props = {
  lists: List[]
}

export const ListOfLists = ({ lists }: Props) => {
  const { id = '' } = useParams()
  const listId = +id

  return (
    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {lists.map(list => (
          <tr
            key={list.id}
            className={classNames({
              'has-background-grey-lighter': list.id === listId,
            })}
          >
            <td className="is-vcentered">
              <Link href={`/lists/${list.id}`}>{list.title}</Link>
            </td>

            <td className="has-text-right is-vcentered">
              {false && (
                <button className="button is-info is-inverted mr-2">
                  <span className="icon is-small">
                    <i className="fas fa-pen-to-square"></i>
                  </span>
                </button>
              )}

              <button
                className="button is-danger is-inverted"
                onClick={() => {
                  deleteList(list.id)

                  if (list.id === listId) {
                    redirect('/lists')
                  }
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
