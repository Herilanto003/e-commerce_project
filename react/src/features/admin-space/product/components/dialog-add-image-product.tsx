import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Fonction d'upload séparée (facile à tester et réutiliser)
async function uploadProductImage(id: number, file: File): Promise<void> {
  const formData = new FormData();
  formData.append("image", file); // clé attendue par FastAPI : file: UploadFile

  const res = await fetch(`http://localhost:8000/api/v1/product/${id}`, {
    method: "PATCH",
    body: formData,
    // ⚠️ Ne jamais mettre Content-Type ici — le browser le gère
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Erreur lors de l'upload");
  }
}

export function DialogAddImageProduct({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}) {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (file: File) => uploadProductImage(id, file),
    onSuccess: () => {
      toast.success("Image ajoutée avec succès !");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // rafraîchit la liste
      setFile(null);
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null; //
    setFile(selected);
  };

  const handleSendImage = () => {
    if (!file) {
      toast.error("Veuillez sélectionner une image !");
      return;
    }
    mutation.mutate(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Image pour le Produit avec ID : {id}</DialogTitle>
          <DialogDescription>
            Sélectionner l'image depuis l'ordinateur local
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <Input
              id="image"
              type="file"
              accept="image/*" // limite aux images
              onChange={handleFileChange}
            />
          </Field>
        </FieldGroup>

        {/* Prévisualisation optionnelle */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Prévisualisation"
            className="rounded-md max-h-40 object-contain mx-auto"
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={mutation.isPending}>
              Annuler
            </Button>
          </DialogClose>
          <Button onClick={handleSendImage} disabled={mutation.isPending}>
            {mutation.isPending ? "Envoi..." : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
