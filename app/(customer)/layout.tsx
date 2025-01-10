import React from "react";

import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  //   const token = (await cookieStore).get("token")?.value || null;

  return (
    <div>
      <Header token="" />
      {children}
      <Footer />
    </div>
  );
}
