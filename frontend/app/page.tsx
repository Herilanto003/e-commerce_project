"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      hello
      <div>
        <Link href={"/account/user/profile"}>My profile</Link>
      </div>
    </div>
  );
}
