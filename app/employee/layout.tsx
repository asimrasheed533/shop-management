import React, { ReactNode } from "react";
import "@/style/dashboard.scss";
import DashboardLayout from "@/components/DashboardLayout";
import EmployLink from "@/data/EmployLink";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardLayout links={EmployLink}>{children}</DashboardLayout>
    </>
  );
}
