/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Layers2Icon,
  LayoutDashboard,
  LogOutIcon,
  UserPenIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "./button";
import Link from "next/link";
import { Role } from "@/types";
import { useState } from "react";
import { logoutUser } from "@/services/auth/logoutUser";
import { useRouter } from "next/navigation";

export default function UserMenu({ userInfo }: { userInfo: any }) {
  const firstChar = userInfo?.email[0] as string;
  const route = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    route.push("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            className="bg-primary rounded-full flex items-center justify-center"
          >
            <p className="text-lg text-center pl-px">
              {firstChar.toUpperCase()}
            </p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {userInfo?.name || "User"}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {userInfo?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {(userInfo?.role === Role.ADMIN ||
              userInfo?.role === Role.SUPER_ADMIN) && (
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link className="w-full" href="/admin/analytics">
                    <div className="flex gap-2 w-full">
                      <LayoutDashboard
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link className="w-full" href="/me">
                  <div className="flex gap-2 w-full">
                    <UserPenIcon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <span>Profile</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link className="w-full" href="/me/orders">
                <div className="flex gap-2 w-full">
                  <Layers2Icon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <span>Orders</span>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          {/* Instead of direct logout, open dialog */}
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AlertDialog for Logout */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to log in again to
              access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleLogout();
                setOpenDialog(false);
              }}
            >
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
