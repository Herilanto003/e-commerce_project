import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type ProductZodType,
  ProductZodSchema,
} from "@/features/admin-space/product/product-zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProduct,
  updateProduct,
} from "@/features/admin-space/product/product-api";
import { fetchAllCategories } from "@/features/admin-space/category/category-api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/edit/product/$productId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Récupérer le produit à éditer
  const product = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(parseInt(productId)),
  });

  // Récupérer les catégories pour le Select
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  const editProduct = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductZodType }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      toast.success("Produit modifié avec succès !");
      navigate({ to: "/admin/product-list" });
    },
    onError: () => {
      toast.error("Erreur de modification du produit !");
    },
  });

  const form = useForm<ProductZodType>({
    resolver: zodResolver(ProductZodSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
      stock_qty: 0,
      unit_price: 0,
    },
  });

  // Pré-remplir le formulaire une fois le produit chargé
  useEffect(() => {
    if (product.data) {
      form.reset({
        name: product.data.name,
        description: product.data.description,
        category_id: product.data.category_id?.toString(),
        stock_qty: product.data.stock_qty,
        unit_price: product.data.unit_price,
      });
    }
  }, [product.data, form, categories.data]);

  const handleSubmit = (data: ProductZodType) => {
    editProduct.mutate({ id: parseInt(productId), data });
  };

  const isLoading = product.isPending || categories.isPending;
  const isError = product.isError || categories.isError;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/admin/product-list">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voir la liste
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-sky-500">
          Modifier le produit #{productId}
        </h1>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : isError ? (
        <div className="text-center py-10 text-destructive">
          Impossible de récupérer les données !
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={() => form.reset()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* CARD GAUCHE : Informations de base */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Détails du produit</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="space-y-4">
                  {/* Nom */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="name"
                          data-invalid={fieldState.invalid}
                        >
                          Nom du produit
                        </FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Ex: Pantalon Cargo"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Catégorie */}
                  <Controller
                    name="category_id"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="category_id"
                          data-invalid={fieldState.invalid}
                        >
                          La catégorie
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString() || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Catégories</SelectLabel>
                              {categories.data?.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Description */}
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="description"
                          data-invalid={fieldState.invalid}
                        >
                          Description
                        </FieldLabel>
                        <textarea
                          {...field}
                          id="description"
                          aria-invalid={fieldState.invalid}
                          placeholder="Ajoutez une description détaillée du produit..."
                          className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
            </Card>

            {/* CARD DROITE : Inventaire, Prix & Actions */}
            <Card className="flex flex-col">
              <div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Inventaire & Tarification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="space-y-4">
                    {/* Stock */}
                    <Controller
                      name="stock_qty"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="stock_qty"
                            data-invalid={fieldState.invalid}
                          >
                            Quantité en stock
                          </FieldLabel>
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            id="stock_qty"
                            aria-invalid={fieldState.invalid}
                            placeholder="0"
                            type="number"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Prix */}
                    <Controller
                      name="unit_price"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="unit_price"
                            data-invalid={fieldState.invalid}
                          >
                            Prix unitaire (€)
                          </FieldLabel>
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            id="unit_price"
                            aria-invalid={fieldState.invalid}
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </CardContent>
              </div>

              <CardFooter className="flex justify-end items-center gap-2 pt-6 border-t mt-auto">
                <Button
                  disabled={editProduct.isPending}
                  type="reset"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <IoReload className="mr-2 h-4 w-4" /> Réinitialiser
                </Button>
                <Button
                  disabled={editProduct.isPending}
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-400 w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" /> Enregistrer
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      )}
    </div>
  );
}
