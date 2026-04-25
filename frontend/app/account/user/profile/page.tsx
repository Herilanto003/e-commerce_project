"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function page() {
  const { user, loading, logout, error } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <p>
        <strong>Username : </strong> {user?.username}
      </p>
      <p>
        <strong>Email : </strong> {user?.email}
      </p>
      <p>
        <strong>Role : </strong> {user?.role}
      </p>

      <div>
        <Button variant={"destructive"} onClick={async () => await logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
