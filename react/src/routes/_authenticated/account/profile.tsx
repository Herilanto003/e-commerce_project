import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/account/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/account/profile"!</div>
}
