"use client";
import { Button } from "@/components/ui/button";
import { EarthLock, Server, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserButton from "./user-button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="max-w-[600px] w-full bg-card rounded-sm flex py-3 px-4 my-3 border shadow-sm justify-between items-center">
      <div className="flex gap-2 sm:gap-3">
        <Button
          asChild
          className={cn(
            {"max-sm:hidden": pathname != "/server"},
            "rounded-sm px-3 flex gap-1"
            )}
          variant={pathname === "/server" ? "default" : "outline"}
          size={"lg"}
        >
          <Link href="/server">
            <Server size={16} />
            <span>Server</span>
          </Link>
        </Button>
        <Button
          asChild
          className={cn(
            {"max-sm:hidden": pathname != "/client"},
            "rounded-sm px-3 flex gap-1"
            )}
          variant={pathname === "/client" ? "default" : "outline"}
          size={"lg"}
        >
          <Link href="/client">
            <User size={16} />
            <span>Client</span>
          </Link>
        </Button>
        <Button
          asChild
          className={cn(
            {"max-sm:hidden": pathname != "/admin"},
            "rounded-sm px-3 flex gap-1"
            )}
          variant={pathname === "/admin" ? "default" : "outline"}
          size={"lg"}
        >
          <Link href="/admin">
            <EarthLock size={16} />
            <span>Admin</span>
          </Link>
        </Button>
        <Button
          asChild
          className={cn(
            {"max-sm:hidden": pathname != "/settings"},
            "rounded-sm px-3 flex gap-1"
            )}
          variant={pathname === "/settings" ? "default" : "outline"}
          size={"lg"}
        >
          <Link href="/settings">
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </Button>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
