import { auth } from "#/auth";

export const useCurrrentUser = async () => {
  const session = await auth();
  return session?.user;
}