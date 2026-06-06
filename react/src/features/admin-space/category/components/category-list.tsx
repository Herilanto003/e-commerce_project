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
import { fetchAllCategories } from "../category-api";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AlertDialogDeleteCategory } from "./alert-dialog-delete-category";
import { useState } from "react";

export function CategoryList() {
  const response = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const handleSelectCategoryToDelete = (id: number) => {
    setId(id);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4 text-sky-500">Les categories</h1>
        <Link to="/admin/category-new">
          <Button variant={"outline"}>
            <Plus /> Nouveau
          </Button>
        </Link>
      </div>

      {/* Liste des categories */}
      {response.isPending ? (
        <div>Loading...</div>
      ) : response.isError ? (
        <div>Erreur de récupération des données !</div>
      ) : (
        <div>
          <AlertDialogDeleteCategory open={open} setOpen={setOpen} id={id} />
          <Table>
            <TableCaption>Liste des categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead># Numéro</TableHead>
                <TableHead>Désignation</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {response.data?.map((data) => (
                <TableRow key={data?.id}>
                  <TableCell>CAT - {data?.id}</TableCell>
                  <TableCell>{data?.name}</TableCell>
                  <TableCell className="flex justify-end items-center">
                    <Button
                      onClick={() => handleSelectCategoryToDelete(data.id)}
                      className="text-xs bg-red-500 hover:bg-red-600 text-white"
                    >
                      Supprimer
                    </Button>
                    <Link to={"/admin/edit/category/" + data.id}>
                      <Button className="text-xs bg-sky-500 hover:bg-sky-600 text-white">
                        Modifier
                      </Button>
                    </Link>
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
