import { ProductAddForm } from "@/features/admin-space/product/components/product-add-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/product-new",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductAddForm />;
}
