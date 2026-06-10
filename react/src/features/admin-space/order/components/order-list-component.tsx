import { useQuery } from "@tanstack/react-query";
import { List } from "lucide-react";
import { getAllOrders } from "../order-api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DialogOrderItems } from "./dialog-order-items";

export function OrderListComponent() {
  const orders = useQuery({ queryKey: ["orders"], queryFn: getAllOrders });

  // if (orders.isFetched) {
  //   console.log(orders.data);
  // }

  const [openItems, setOpenItems] = useState(false);
  const [idOrder, setIdOrder] = useState<number | null>(null);
  const handleSelectOrder = (idOrder: number) => {
    setIdOrder(idOrder);
    setOpenItems(true);
  };

  return (
    <div>
      {openItems && idOrder && (
        <DialogOrderItems
          open={openItems}
          setOpen={setOpenItems}
          id={idOrder}
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4 text-sky-500 flex items-center gap-2">
          <List /> <span>Liste des commandes</span>
        </h1>
      </div>

      {orders.isLoading ? (
        <div>Chargement...</div>
      ) : orders.isError ? (
        <div>Erreur ...</div>
      ) : (
        <div className="min-h-screen">
          <Table>
            <TableCaption>Liste des commandes clients</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead># Numéro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prix total</TableHead>
                <TableHead>Ligne des commandes</TableHead>
                <TableHead>Client (Utilisateur)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.status_order === "pending" ? (
                      <Badge className="bg-amber-500">En cours</Badge>
                    ) : item.status_order === "cancel" ? (
                      <Badge className="bg-red-500">Annulé</Badge>
                    ) : item.status_order === "paid" ? (
                      <Badge className="bg-green-500">Payé</Badge>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>{item.total_price_order} €</TableCell>
                  <TableCell>{item.total_item}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleSelectOrder(item.id)}
                      className="bg-sky-500 hover:bg-sky-400 cursor-pointer"
                    >
                      Ligne de commandes
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
