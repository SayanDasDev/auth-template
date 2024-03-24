import { useSession } from "next-auth/react"


export const useCurrrentRole = () => {
  const session = useSession();
  return session.data?.user.role;
}