import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductZodSchema, type ProductZodType } from "../product-zod";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postProduct } from "../product-api";
import { fetchAllCategories } from "../../category/category-api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Importations pour les Cards de shadcn/ui (ajustez le chemin si nécessaire)
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductAddForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const saveProduct = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      // Note: On invalide généralement "products" ici plutôt que "categories" après l'ajout d'un produit
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produit ajouté avec succès !");
      navigate({ to: "/admin/product-list" });
    },
    onError: () => {
      toast.error("Erreur d'ajout du produit !");
    },
  });

  // Obtenir les catégories
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
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

  const handleSubmit = async (data: ProductZodType) => {
    saveProduct.mutate(data);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link to="/admin/product-list">
          <Button variant={"outline"}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voir la liste
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-sky-500">
          Ajouter un nouveau produit
        </h1>
      </div>

      {categories.isPending ? (
        <div className="text-center py-10">Chargement...</div>
      ) : categories.isError ? (
        <div className="text-center py-10 text-destructive">
          Impossible de récupérer les catégories !
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={() => form.reset()}
        >
          {/* Grille principale sur deux colonnes pour écran large */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* CARD GAUCHE : Informations de base */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Détails du produit</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="space-y-4">
                  {/* Nom du produit */}
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
                          aria-invalidate={fieldState.invalid}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Catégories</SelectLabel>
                              {categories.data?.map((item) => (
                                <SelectItem
                                  key={item?.id}
                                  value={item.id.toString()}
                                >
                                  {item?.name}
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

                  {/* Description (Textarea) */}
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
                        {/* Utilisation d'un textarea natif stylisé ou composant Textarea de shadcn */}
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

            {/* CARD DROITE : Stock, Prix & Boutons d'action */}
            <Card className="flex flex-col">
              <div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Inventaire & Tarification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup className="space-y-4">
                    {/* Quantité Stock */}
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

                    {/* Prix unitaire */}
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

              {/* Boutons tout en bas de la carte de droite */}
              <CardFooter className="flex justify-end items-center gap-2 pt-6 border-t mt-auto">
                <Button
                  disabled={saveProduct.isPending}
                  type="reset"
                  variant={"outline"}
                  className="w-full sm:w-auto"
                >
                  <IoReload className="mr-2 h-4 w-4" /> Réinitialiser
                </Button>
                <Button
                  disabled={saveProduct.isPending}
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
