import React, { ReactNode } from "react";
import "@/style/dashboard.scss";
import DashboardLayout from "@/components/DashboardLayout";
import EmployLink from "@/data/EmployLink";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function layout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return redirect("/signIn");
  }
  return (
    <>
      <DashboardLayout links={EmployLink}>{children}</DashboardLayout>
    </>
  );
}
