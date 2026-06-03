import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  toggleRefresh: () => void;
}

interface MyRouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Toaster richColors />
      <Outlet />
    </>
  );
}
