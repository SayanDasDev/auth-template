import { useSession } from "next-auth/react"


export const useCurrrentUser = () => {
  const session = useSession();
  return session.data?.user;
}