"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import UserInfo from "../_components/user-info";

export default function ClientPage() {
  const user = useCurrentUser();

  return (
    <div className="mb-3 w-full flex justify-center">
      <UserInfo user={user} label="👨🏽‍💻 Client Component" />
    </div>
  );
}
