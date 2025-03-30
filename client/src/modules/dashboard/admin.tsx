import { Tab, Tabs } from "@heroui/tabs";
import { lazy } from "react";

import { AnalyticsIcon, EmployeesIcon } from "@/components/icons.tsx";

const Analytics = lazy(() => import(`@/modules/admin/analytics.tsx`));
const Employees = lazy(() => import(`@/modules/admin/employees.tsx`));

export default function AdminDashboard() {
  return (
    <div className="flex w-full flex-col">
      <Tabs isVertical aria-label="Options">
        <Tab
          key="analytics"
          title={
            <div className="flex items-center space-x-2">
              <AnalyticsIcon size={18} />
              <span>Analytics</span>
            </div>
          }
        >
          <Analytics />
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
          <Employees />
        </Tab>
      </Tabs>
    </div>
  );
}
