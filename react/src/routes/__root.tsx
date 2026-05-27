import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import type { AuthContextType } from "@/features/auth/context/AuthContext";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Toaster richColors />
      <Outlet />
    </React.Fragment>
  );
}
