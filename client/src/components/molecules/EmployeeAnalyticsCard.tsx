import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { useMemo } from "react";
import { Progress } from "@heroui/progress";

import { EmployeeTasksAnalyticsResponse } from "../../../api/analytics/task-completion-overview/types.ts";

import { subtitle, title } from "@/components/primitives.ts";

type EmployeeAnalyticalProps = {
  employee: EmployeeTasksAnalyticsResponse;
};

export default function EmployeeAnalyticsCard({
  employee,
}: EmployeeAnalyticalProps) {
  const {
    firstName,
    lastName,
    department,
    totalTasks = 0,
    completedTasks = 0,
  } = employee;

  const displayName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName],
  );

  const footerText = useMemo(() => {
    const taskText = totalTasks === 1 ? "task" : "tasks";

    return `${completedTasks} of ${totalTasks} ${taskText} completed`;
  }, [totalTasks, completedTasks]);

  const taskCompletionPercentage = useMemo(() => {
    if (totalTasks <= 0) return 0;

    return Math.round((completedTasks / totalTasks) * 100);
  }, [totalTasks, completedTasks]);

  return (
    <Card className="py-2 px-3 max-sm:w-full sm:min-w-52">
      <CardHeader>
        <div>
          <h1 className={title({ size: "xs" })}>{displayName}</h1>
          <p className={subtitle()}>{department ?? ""}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div>
          <Progress
            showValueLabel
            classNames={{
              base: "max-w-md",
              track: "border border-default-50",
              indicator: "bg-gradient-to-r from-[#5EA2EF] to-[#0072F5]",
              label: "tracking-wider font-medium text-default-600 text-sm",
              value: "text-foreground/60 text-sm",
            }}
            label="Task completion"
            radius="sm"
            size="md"
            value={taskCompletionPercentage}
          />
        </div>
      </CardBody>
      <CardFooter>
        <div>
          <p className={subtitle()}>{footerText}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
