import React from "react";
import "@/style/listing.scss";
import "@/style/dashboard.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { IDashboardLayout } from "@/interface";

export default function DashboardLayout({ children, links }: IDashboardLayout) {
  return (
    <div className="dashboard">
      <DashboardSidebar links={links} />
      <div className="dashboard__main">
        <DashboardHeader />
        <div className="dashboard__main__content">
          <div className="dashboard__main__content__inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
