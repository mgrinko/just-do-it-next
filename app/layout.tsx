import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { SessionProvider } from '../components/SessionProvider'
import NavMenu from '../components/NavMenu';

export const metadata: Metadata = {
  title: 'Just Do It!',
  description: 'Manage your tasks and get things done!',
}

type Props = { children: React.ReactNode }

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession()

  return (
    <html lang="en" className="has-background-warning-light">
      <body>
        <SessionProvider session={session}>
          {/* <NavMenu /> */}
          {children}
        </SessionProvider> 
      </body>
    </html>
  )
}
