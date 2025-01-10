import React, { ReactNode } from "react";
import "@/style/dashboard.scss";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLinks from "@/data/AdminLinks";
export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardLayout links={AdminLinks}>{children}</DashboardLayout>
    </>
  );
}
