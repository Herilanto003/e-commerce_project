import { CategoryAddForm } from "@/features/admin-space/category/components/category-add-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/category-new",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryAddForm />;
}
