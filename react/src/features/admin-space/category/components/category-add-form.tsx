import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryZodSchema, type CategoryZodType } from "../category-zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { IoReload } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategorie } from "../category-api";

export function CategoryAddForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const saveCategory = useMutation({
    mutationFn: postCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categorie ajouté avec succès !");
      navigate({ to: "/admin/category-list" });
    },
    onError: () => {
      toast.error("Erreur d'ajout du categorie !");
    },
  });

  const form = useForm<CategoryZodType>({
    resolver: zodResolver(CategoryZodSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: CategoryZodType) => {
    console.log(data);
    saveCategory.mutate(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link to="/admin/category-list">
          <Button variant={"outline"}>
            <ArrowLeft /> Voir la liste
          </Button>
        </Link>
        <h1 className="text-2xl mb-4 text-sky-500">
          Ajouter une nouvelle categorie
        </h1>
      </div>

      <div className="max-w-md m-auto mt-5">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={() => form.reset()}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" data-invalid={fieldState.invalid}>
                    Nom du categorie
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="exemple. Patalon"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-4 flex justify-end items-center gap-2">
            <Button
              disabled={saveCategory.isPending}
              type="reset"
              variant={"outline"}
            >
              <IoReload /> Réinitialiser
            </Button>
            <Button
              disabled={saveCategory.isPending}
              type="submit"
              className="bg-sky-500 hover:bg-sky-400"
            >
              <Save /> Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
