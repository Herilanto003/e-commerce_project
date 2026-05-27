import FormRegister from "@/features/auth/components/FormRegister";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <FormRegister />
    </div>
  );
}
