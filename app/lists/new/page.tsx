import { createList } from '@/actions/list.actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function create(formData: FormData) {
  'use server'

  const list = await createList(formData)

  redirect(`/lists/${list?.id}`)
}

export default async function Page() {
  return (
    <div className="content">
      <div className="block is-flex is-justify-content-space-between">
        <h2 className="title">Create a List</h2>
        <Link href="/lists" className="delete is-medium" />
      </div>

      <form action={create}>
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name-title">
            Title
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="title"
              id="comment-author-name-title"
              placeholder="List Title"
              className="input"
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user fa-heading"></i>
            </span>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">
              Create
            </button>
          </div>

          <div className="control">
            <Link href="/lists" className="button is-link is-light">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
