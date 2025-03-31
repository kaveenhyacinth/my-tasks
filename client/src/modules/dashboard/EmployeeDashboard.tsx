import { lazy, useCallback, useEffect } from "react";

import { STORAGE_KEY_ALERT } from "@/lib/constants.ts";
import { TASK_ALERT_STATUS } from "@/types";

const TasksModule = lazy(() => import("@/modules/employee/TasksModule.tsx"));

export default function EmployeeDashboard() {
  const checkAlert = useCallback(() => {
    const isAlertVisible = localStorage.getItem(STORAGE_KEY_ALERT);

    if (!isAlertVisible) {
      localStorage.setItem(STORAGE_KEY_ALERT, TASK_ALERT_STATUS.VISIBLE);
    }
  }, []);

  useEffect(() => {
    checkAlert();
  }, [checkAlert]);

  return (
    <div>
      <TasksModule />
    </div>
  );
}
