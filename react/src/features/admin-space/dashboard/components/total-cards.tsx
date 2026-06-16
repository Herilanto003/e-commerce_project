import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Box,
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { fetchAllTotals } from "../dashboard-api";
import { useEffect, useState } from "react";

interface CardConfigInterface {
  title: string;
  value: number;
  icon: any;
  className: string;
  bgClass?: string;
}

export function TotalCards() {
  const totalData = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchAllTotals,
  });
  const [cardConfig, setCardConfig] = useState<CardConfigInterface[]>([]);

  useEffect(() => {
    if (totalData.isSuccess) {
      setCardConfig([
        {
          title: "Total utilisateurs",
          value: totalData.data.total_user,
          icon: Users,
          className: "text-muted-foreground",
        },
        {
          title: "Total des produits",
          value: totalData.data.total_product,
          icon: Box,
          className: "text-muted-foreground",
        },
        {
          title: "Total des commandes",
          value: totalData.data.total_order,
          icon: ShoppingCart,
          className: "text-muted-foreground",
        },
        {
          title: "Commandes Payées",
          value: totalData.data.total_order_cancel,
          icon: CheckCircle2,
          className: "text-emerald-600 dark:text-emerald-400",
          bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
        },
        {
          title: "Commandes En cours",
          value: totalData.data.total_order_pending,
          icon: Clock,
          className: "text-amber-600 dark:text-amber-400",
          bgClass: "bg-amber-50 dark:bg-amber-950/30",
        },
        {
          title: "Commandes Annulées",
          value: totalData.data.total_order_paid,
          icon: XCircle,
          className: "text-destructive",
          bgClass: "bg-destructive/10",
        },
      ]);
    }
  }, [totalData.isSuccess]);

  return (
    // Responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {totalData.isPending ? (
        <div>Chargement...</div>
      ) : totalData.isError ? (
        <div>Le serveur ne répond pas</div>
      ) : (
        cardConfig.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className={`transition-all hover:shadow-md ${card.bgClass || ""}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${card.className}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">
                  {card.value.toLocaleString()}{" "}
                  {/* Formate les grands nombres (ex: 1 500) */}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
