"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
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


interface UpNavProps {
  title: string;
}

export default function UpNav({ title }: UpNavProps) {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">

      {/* Back */}
      <div
        onClick={() => router.back()}
        className="flex items-center justify-center w-10 h-10 bg-card rounded-xl cursor-pointer hover:bg-muted transition-colors"
      >
        <FaArrowLeftLong className="text-foreground" />
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-foreground">
        {title}
      </h1>

      {/* Logout */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex items-center justify-center w-10 h-10 bg-card rounded-xl cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="text-foreground" size={20} />
          </div>
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
