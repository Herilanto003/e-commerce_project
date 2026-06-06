import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../category-api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AlertDialogDeleteCategory({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Catégorie supprimé avec succès !");
      setOpen(false);
    },
    onError: (error) => {
      console.log("Err :: ", error);
      toast.error("Erreur de suppression de la catégorie");
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Êtes vous sûr de supprimer cet élément ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cet action est irréversible ! Elle va supprimer la catégorie avec l'
            #ID : {id}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"outline"}
            disabled={mutation.isPending}
            onClick={() => setOpen(false)}
          >
            Annulé
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(id)}
          >
            Confirmé
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
