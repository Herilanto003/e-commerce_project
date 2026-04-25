import React from "react";

export default function ContainerAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-72 sm:w-92 max-w-2xl p-5 shadow-lg rounded-lg bg-white">
      {children}
    </div>
  );
}
