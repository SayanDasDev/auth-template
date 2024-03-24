import { currentUser } from "@/lib/auth";
import UserInfo from "../_components/user-info";

export default async function ServerPage() {

  const user = await currentUser();

  return (
    <div className="mb-3 w-full flex justify-center">
      <UserInfo user={user} label="🗄️ Server Component" />
    </div>
  )
}