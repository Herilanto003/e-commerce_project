import { TotalCards } from "@/features/admin-space/dashboard/components/total-cards";
import { OrderListComponent } from "@/features/admin-space/order/components/order-list-component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/dashboard",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TotalCards />{" "}
      <div className="mt-10">
        <OrderListComponent />
      </div>
    </>
  );
}
