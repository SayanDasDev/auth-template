"use client";

import { useCurrrentUser } from "@/hooks/use-current-user";
import UserInfo from "../_components/user-info";

export default function ClientPage() {
  const user = useCurrrentUser();

  return (
    <div className="mb-3 w-full flex justify-center">
      <UserInfo user={user} label="👨🏽‍💻 Client Component" />
    </div>
  );
}
