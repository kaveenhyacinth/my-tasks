import { Chip } from "@heroui/chip";
import { memo, useMemo } from "react";

import { TaskPriority } from "../../../api/tasks/types.ts";

type ChipData = {
  color: "danger" | "warning" | "default";
  text: string;
};

type TaskPriorityChipProps = {
  priorityLevel: TaskPriority;
};

const TaskPriorityChip = ({ priorityLevel }: TaskPriorityChipProps) => {
  const chipData = useMemo<ChipData>(() => {
    switch (priorityLevel) {
      case 1:
        return { color: "danger", text: "High" };
      case 2:
        return { color: "warning", text: "Medium" };
      default:
        return { color: "default", text: "Low" };
    }
  }, [priorityLevel]);

  return (
    <Chip color={chipData.color} variant="flat">
      {chipData.text}
    </Chip>
  );
};

export default memo(TaskPriorityChip);
