"use client"

import { auth, signOut } from "#/auth"
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

export default function AdminPage() {

  const user = useCurrrentUser();
  const session = useSession();

  return (
    <div className="">
      <h1>Settings</h1>
      <p>This is the settings page</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
        <Button onClick={() => logout()} variant={"secondary"} size={"lg"} type="submit" >Sign Out</Button>
    </div>
  )
}