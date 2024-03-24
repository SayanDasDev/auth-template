"use client";

import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/shared/form-succes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminPage() {
  const onAPIRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route 🎉");
      } else {
        toast.error("Forbidden API Route ❌");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.error);
      }
    });
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader className="text-xl text-center font-bold text-primary">
        <p>🛡️ Admin Page</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess
            className="!mt-0"
            message="You can access this content! 🎉"
          />
        </RoleGate>
        <Card className="bg-background p-4 !mt-6 flex justify-between flex-wrap gap-2">
          <div className="font-semibold text-lg flex items-center gap-1 truncate">
            Admin-Only API Route
          </div>
          <Button onClick={onAPIRouteClick}>Click to Test</Button>
        </Card>
        <Card className="bg-background p-4 flex justify-between flex-wrap gap-2">
          <div className="font-semibold text-lg flex items-center gap-1 truncate">
            Admin-Only Server Action
          </div>
          <Button onClick={onServerActionClick}>Click to Test</Button>
        </Card>
      </CardContent>
    </Card>
  );
}
