import { auth, signOut } from "#/auth"
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {

  const session = await auth();

  return (
    <div className="">
      <h1>Settings</h1>
      <p>This is the settings page</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <Button variant={"secondary"} size={"lg"} type="submit" >Sign Out</Button>
      </form>
    </div>
  )
}