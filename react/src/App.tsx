import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import le route tree généré
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./features/auth/context/AuthContext";

// Créer un nouvel instance route
const router = createRouter({ routeTree, context: { auth: undefined! } });

// Enregistrer l'instance router pour un type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}
