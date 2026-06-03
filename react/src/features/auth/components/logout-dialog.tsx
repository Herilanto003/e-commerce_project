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
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/config";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [pending, setPending] = useState(false);

  const handleLogout = async () => {
    console.log("Handle logout");
    setPending(true);
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("error");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Erreur de déconnexion");
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vous êtes sûr pour déconnecter</AlertDialogTitle>
          <AlertDialogDescription>
            C'est action est irreversible !
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"ghost"}>Annuler</Button>
          </AlertDialogCancel>
          <Button disabled={pending} type="button" onClick={handleLogout}>
            {pending ? "..." : "Continuer"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
