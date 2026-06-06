import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  getCategory,
  updateCategorie,
} from "@/features/admin-space/category/category-api";
import {
  CategoryZodSchema,
  type CategoryZodType,
} from "@/features/admin-space/category/category-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/edit/category/$categoryId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();

  const category = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(parseInt(categoryId)),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editCategory = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryZodType }) =>
      updateCategorie(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categorie modifié avec succès !");
      navigate({ to: "/admin/category-list" });
    },
    onError: () => {
      toast.error("Erreur de modification du categorie !");
    },
  });

  const form = useForm<CategoryZodType>({
    resolver: zodResolver(CategoryZodSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category.data) {
      form.reset({
        name: category.data.name,
      });
    }
  }, [category.data, form]);

  const handleSubmit = async (data: CategoryZodType) => {
    console.log(data);
    editCategory.mutate({ id: parseInt(categoryId), data: data });
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
          Modification Catégorie avec l'ID : {categoryId}
        </h1>
      </div>

      <div className="max-w-md m-auto mt-5">
        {category.isPending ? (
          <div>Chargement...</div>
        ) : category.isError ? (
          <div>Erreur de trouvé la catégorie !</div>
        ) : (
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
                    <FieldLabel
                      htmlFor="name"
                      data-invalid={fieldState.invalid}
                    >
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
                disabled={editCategory.isPending}
                type="reset"
                variant={"outline"}
              >
                <IoReload /> Réinitialiser
              </Button>
              <Button
                disabled={editCategory.isPending}
                type="submit"
                className="bg-sky-500 hover:bg-sky-400"
              >
                <Save /> Enregistrer
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
