import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_admin_space")({
  beforeLoad: ({ context, location }) => {
    console.log(context.auth.user);
    if (context.auth.user?.role !== "ADMIN") {
      throw redirect({ to: "/", search: { redirect: location.href } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
