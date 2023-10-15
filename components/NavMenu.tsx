'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

function AuthButton() {
  const { data: session, status } = useSession()

  return (
    <nav
      className="navbar is-warning has-shadow level is-fixed-top is-mobile px-4"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="level-left">
        <Link href="/" className="level-item is-active">
          Home
        </Link>
      </div>

      <div className="level-right">
        {session ? (
          <>
            <p className="level-item">{session?.user?.email}</p>

            <figure className="image is-32x32 level-item">
              <Image
                className="is-rounded"
                src={session?.user?.image ?? ''}
                alt={session?.user?.name ?? ''}
                width={32}
                height={32}
              />
            </figure>

            <button
              onClick={() => signOut()}
              className="level-item button is-danger"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="level-item button is-primary"
          >
            <strong>Sign in</strong>
          </button>
        )}
      </div>
    </nav>
  )
}

export default function NavMenu() {
  return <AuthButton />
}
