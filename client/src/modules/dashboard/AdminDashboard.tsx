import { Tab, Tabs } from "@heroui/tabs";
import { lazy } from "react";

import { AnalyticsIcon, EmployeesIcon } from "@/components/icons.tsx";

const AnalyticsModule = lazy(
  () => import("@/modules/admin/AnalyticsModule.tsx"),
);
const EmployeesModule = lazy(
  () => import("@/modules/admin/EmployeesModule.tsx"),
);

export default function AdminDashboard() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab
          key="analytics"
          title={
            <div className="flex items-center space-x-2">
              <AnalyticsIcon size={18} />
              <span>Analytics</span>
            </div>
          }
        >
          <AnalyticsModule />
        </Tab>
        <Tab
          key="employees"
          title={
            <div className="flex items-center space-x-2">
              <EmployeesIcon size={18} />
              <span>Employees</span>
            </div>
          }
        >
          <EmployeesModule />
        </Tab>
      </Tabs>
    </div>
  );
}
