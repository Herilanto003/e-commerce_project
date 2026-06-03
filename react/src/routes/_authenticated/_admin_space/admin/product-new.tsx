import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_admin_space/admin/product-new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/_admin_space/admin/product-new"!</div>
}
