import { useState } from "react";
import { Checkbox } from "@heroui/checkbox";

import { TaskResponse } from "../../../api/tasks/types.ts";

type TaskStatusCheckboxProps = {
  task: TaskResponse;
  onChangeStatus: (status: boolean) => void;
};

export const TaskStatusCheckbox = ({
  task,
  onChangeStatus,
}: TaskStatusCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleOnChangeStatus = (status: boolean) => {
    setIsChecked(status);
    onChangeStatus(status);
  };

  return (
    <Checkbox
      color="success"
      isSelected={isChecked}
      onValueChange={handleOnChangeStatus}
    >
      {isChecked ? "Completed" : "Mark as completed"}
    </Checkbox>
  );
};
