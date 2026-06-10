import { OrderListComponent } from "@/features/admin-space/order/components/order-list-component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/order-list",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderListComponent />;
}
