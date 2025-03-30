import { Tabs, Tab } from "@heroui/tabs";

import DefaultLayout from "@/layouts/default";
import { AnalyticsIcon, EmployeesIcon } from "@/components/icons.tsx";
import { Analytics } from "@/modules/admin/analytics.tsx";
import { Employees } from "@/modules/admin/employees.tsx";

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-4">
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
      </section>
    </DefaultLayout>
  );
}
