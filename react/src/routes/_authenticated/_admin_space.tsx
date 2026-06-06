import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import SidebarAdmin from "@/features/admin-space/components/sidebar-admin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
  return (
    <SidebarProvider>
      <SidebarAdmin />

      <main className="w-full">
        <header className="w-full bg-white h-10 border-b flex gap-4 items-center">
          <SidebarTrigger />

          <span>Dashboard</span>
        </header>

        <div className="m-auto max-w-480 w-5xl py-5">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
