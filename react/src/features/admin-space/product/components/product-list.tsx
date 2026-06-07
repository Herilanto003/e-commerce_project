import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../product-api";
import { Link } from "@tanstack/react-router";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { AlertDialogDeletdeleteProduct } from "./alert-dialog-delete-product";
import { useState } from "react";
import { API_URL } from "@/lib/config";
import { DialogAddImageProduct } from "./dialog-add-image-product";
import { DialogViewProduct } from "./dialog-view-product";
import type { ProductType } from "../product-type";

export function ProductList() {
  const response = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  // Delete
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>(0);

  const handleSelectProductToDelete = (id: number) => {
    setId(id);
    setOpen(true);
  };

  // Add/Edit image
  const [openAddImage, setOpenAddImage] = useState(false);
  const handleOpenAddImage = (id: number) => {
    setOpenAddImage(true);
    setId(id);
  };

  const [openView, setOpenView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );

  const handleOpenView = (product: ProductType) => {
    setSelectedProduct(product);
    setOpenView(true);
  };

  return (
    <div>
      <DialogViewProduct
        open={openView}
        setOpen={setOpenView}
        product={selectedProduct}
      />

      {openAddImage && id !== 0 && (
        <DialogAddImageProduct
          open={openAddImage}
          setOpen={setOpenAddImage}
          id={id}
        />
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4 text-sky-500">Les produits</h1>
        <Link to="/admin/product-new">
          <Button variant="outline">
            <Plus /> Nouveau
          </Button>
        </Link>
      </div>

      {response.isPending ? (
        <div>Loading...</div>
      ) : response.isError ? (
        <div>Erreur de récupération des données !</div>
      ) : (
        <div className="min-h-screen">
          <AlertDialogDeletdeleteProduct
            open={open}
            setOpen={setOpen}
            id={id}
          />
          <Table>
            <TableCaption>Liste des products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead># Numéro</TableHead>
                <TableHead>Désignation</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead>Prix unitaire</TableHead>
                <TableHead>Quantité en stock</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {response.data?.map((data) => (
                <TableRow key={data?.id}>
                  <TableCell>
                    <img
                      src={API_URL + "/" + data?.image_link}
                      alt={data?.name}
                      className="w-10"
                    />
                  </TableCell>
                  <TableCell>PRD - {data?.id}</TableCell>
                  <TableCell>{data?.name}</TableCell>
                  <TableCell>{data?.category_id}</TableCell>
                  <TableCell>{data?.unit_price} €</TableCell>
                  <TableCell>{data?.stock_qty}</TableCell>
                  <TableCell className="flex justify-end items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleOpenView(data)}
                    >
                      <Eye />
                    </Button>

                    <Button
                      onClick={() => handleSelectProductToDelete(data.id)}
                      variant="destructive"
                    >
                      <Trash />
                    </Button>
                    <Link to={"/admin/edit/product/" + data.id}>
                      <Button className="text-xs bg-sky-500 hover:bg-sky-600 text-white">
                        <Edit />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => handleOpenAddImage(data.id)}
                    >
                      {data.image_link ? "Modifier image" : "Ajouter image"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
