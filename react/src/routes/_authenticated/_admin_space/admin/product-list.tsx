import { ProductList } from "@/features/admin-space/product/components/product-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/product-list",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductList />;
}
