import { useMemo } from "react";

import { ExclamationCircleIcon } from "@/components/icons.tsx";

type TaskDueDateChipProps = {
  date: string;
};

export const TaskDueDateChip = ({ date }: TaskDueDateChipProps) => {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  }, [date]);

  const isPast = useMemo(() => {
    const dateObj = new Date(date);

    return dateObj.getTime() < Date.now();
  }, [date]);

  return (
    <div className="inline-flex items-center gap-1">
      {isPast ? (
        <ExclamationCircleIcon className="text-danger" size={18} />
      ) : (
        <></>
      )}
      <span className={isPast ? "text-danger" : ""}>{formattedDate}</span>
    </div>
  );
};
