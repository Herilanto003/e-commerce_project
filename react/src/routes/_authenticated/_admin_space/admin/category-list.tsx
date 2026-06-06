import { CategoryList } from "@/features/admin-space/category/components/category-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_admin_space/admin/category-list",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryList />;
}
