import { useAuth } from "@/features/auth/context/AuthContext";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";

// export const Route = createFileRoute("/_authenticated")({
//   beforeLoad: ({ context, location }) => {
//     if (!context.auth.user) {
//       throw redirect({
//         to: "/login",
//         search: {
//           redirect: location.href,
//         },
//       });
//     }
//   },
//   component: RouteComponent,
// });

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/" });
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
