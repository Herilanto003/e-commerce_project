import FormLogin from "@/features/auth/components/FormLogin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <FormLogin />
    </div>
  );
}
