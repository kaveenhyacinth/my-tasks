import { lazy } from "react";

const Tasks = lazy(() => import(`@/modules/employee/TasksModule.tsx`));

export default function EmployeeDashboard() {
  return (
    <div>
      <Tasks />
    </div>
  );
}
