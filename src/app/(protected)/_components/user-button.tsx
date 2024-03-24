"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn, getShortName } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { EarthLock, LogOut, Server, Settings, User } from "lucide-react";
import { useCurrrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";

const UserButton = () => {
  const pathname = usePathname();
  const user = useCurrrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit h-fit rounded-full p-px bg-white shadow-sm border">
        <Avatar>
          <AvatarImage src={user?.image || "a"} alt="user-avatar" />
          <AvatarFallback>
            {user?.name && getShortName(user?.name).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-40 space-y-px rounded-sm"
        align="end"
      >
        <DropdownMenuLabel className="text-sm px-3">
          {user?.name}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            className={cn("flex gap-2", { hidden: pathname === "/server" })}
            href="/server"
          >
            <Server size={16} />
            Server
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            className={cn("flex gap-2", { hidden: pathname === "/client" })}
            href="/client"
          >
            <User size={16} />
            Client
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            className={cn("flex gap-2", { hidden: pathname === "/admin" })}
            href="/admin"
          >
            <EarthLock size={16} />
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            className={cn("flex gap-2", { hidden: pathname === "/settings" })}
            href="/settings"
          >
            <Settings size={16} />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="gap-2 text-destructive cursor-pointer focus:bg-destructive/70 focus:text-white"
        >
          <LogoutButton>
            <LogOut size={16} />
            Log out
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
