'use client'

import classNames from 'classnames'
import { usePathname } from 'next/navigation'

export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div
      className={classNames('column', 'Sidebar', {
        'Sidebar--open': pathname !== '/lists',
      })}
    >
      <div className="box">{children}</div>
    </div>
  )
}
