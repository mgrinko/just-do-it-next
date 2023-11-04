import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/index.scss'

import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { SessionProvider } from '../components/SessionProvider'
import NavMenu from '../components/NavMenu';
import { authOptions } from '@/utils/authOptions';

export const metadata: Metadata = {
  title: 'Just Do It!',
  description: 'Manage your tasks and get things done!',
}

type Props = { children: React.ReactNode }

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="has-background-warning-light has-navbar-fixed-top">
      <body>
        <SessionProvider session={session}>
          <NavMenu />
          <main className="section container is-max-widescreen">
            {children}
          </main>
        </SessionProvider> 
      </body>
    </html>
  )
}
