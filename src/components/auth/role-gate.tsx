import { useCurrrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import React from 'react'
import { FormError } from '../shared/form-error';

interface RoleGateProps {
  children: React.ReactNode,
  allowedRole: UserRole,
}

const RoleGate = ({
  children,
  allowedRole,
}:RoleGateProps) => {

  const role = useCurrrentRole();

  if(role !== allowedRole) {
    return <FormError className='!mt-0' message="You are not allwed to access this content" />;
  }

  return (
    <>
     {children} 
    </>
  )
}

export default RoleGate
