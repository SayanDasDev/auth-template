"use client"

import { logout } from '@/actions/logout'
import React from 'react'

interface LogoutButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  className?: string,
}

const LogoutButton = ({
  children,
  className,
  ...props
}: LogoutButtonProps) => {

  return (
    <div {...props} onClick={() => logout()} className={className}>
      {children}
    </div>
  )
}

export default LogoutButton
