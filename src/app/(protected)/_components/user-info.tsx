import { ExtendedUser } from "#/next-auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";
import React from "react";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader className="text-xl text-center font-bold text-primary">
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <Card className="bg-background p-4 flex justify-between flex-wrap">
          <div className="font-semibold text-lg flex items-center gap-1">
            Name
          </div>
          <Badge variant={"data"} >
            <pre>{user?.name}</pre>
          </Badge>
        </Card>
        <Card className="bg-background p-4 flex justify-between flex-wrap">
          <div className="font-semibold text-lg flex items-center gap-1 truncate">
            ID
          </div>
          <Badge variant={"data"} >
            <pre>{user?.id}</pre>
          </Badge>
        </Card>
        <Card className="bg-background p-4 flex justify-between flex-wrap">
          <div className="font-semibold text-lg flex items-center gap-1">
            Email
          </div>
          <Badge variant={"data"} >
            <pre>{user?.email}</pre>
          </Badge>
        </Card>
        <Card className="bg-background p-4 flex justify-between flex-wrap">
          <div className="font-semibold text-lg flex items-center gap-1">
            Role
          </div>
          <Badge variant={"data"} >
            <pre>{user?.role}</pre>
          </Badge>
        </Card>
        <Card className="bg-background p-4 flex justify-between flex-wrap">
          <div className="font-semibold text-lg flex items-center gap-1">
            2-Factor Authentication
          </div>
          <Badge className="rounded-[8px]" variant={user?.isTwoFactorEnabled ? "success" : "destructive"} >
            <pre>{user?.isTwoFactorEnabled ? "ON" : "OFF"}</pre>
          </Badge>
        </Card>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
