import React from "react";
import { getCurrentUser } from "@/features/auth/api";

export default async function UserDetailHeader() {
  const { user } = await getCurrentUser();

  return <div>{user?.username}</div>;
}
