'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export function AuthButton() {
  'use client'

  const { data: session } = useSession()

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="button is-success"
      >
        <strong>Sign in</strong>
      </button>
    )
  }

  return (
    <button
      onClick={() => signOut()}
      className="button is-danger"
    >
      Sign out
    </button>
  )
}

