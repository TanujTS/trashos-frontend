"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/use-auth";

interface HeaderProps {
  name: string;
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Header({ name }: HeaderProps) {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-foreground/60">welcome back</p>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="h-14 w-14 rounded-2xl bg-card flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="text-foreground text-xl" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
