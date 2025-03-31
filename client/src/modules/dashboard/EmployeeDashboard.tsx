import { lazy } from "react";

const TasksModule = lazy(() => import("@/modules/employee/TasksModule.tsx"));

export default function EmployeeDashboard() {
  return (
    <div>
      <TasksModule />
    </div>
  );
}
