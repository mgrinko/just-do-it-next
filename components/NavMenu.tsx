import Image from 'next/image'
import Link from 'next/link'
import { AuthButton } from './AuthButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

async function UserInfo() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return null
  }

  const { user } = session

  return (
    <>
      <p className="level-item">{user.name}</p>

      <figure className="image is-32x32 level-item">
        <Image
          className="is-rounded"
          src={user.image ?? ''}
          alt={user.name ?? ''}
          width={32}
          height={32}
        />
      </figure>
    </>
  )
}

export default function NavMenu() {
  return (
    <nav
      className="navbar has-shadow level is-fixed-top is-mobile px-4"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="level-left">
        <Link href="/" className="level-item is-4 button is-inverted">
          Just do It!
        </Link>
      </div>

      <div className="level-right">
        <div className="level-item">
          <UserInfo />
        </div>
        <div className="level-item">
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}
