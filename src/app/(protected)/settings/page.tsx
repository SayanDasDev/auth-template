import { auth } from "#/auth"

export default async function SettingsPage() {

  const session = await auth();

  return (
    <div className="">
      <h1>Settings</h1>
      <p>This is the settings page</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}