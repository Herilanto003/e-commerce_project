import React from "react";

export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-3/4 m-auto max-w-7xl">{children}</div>;
}
