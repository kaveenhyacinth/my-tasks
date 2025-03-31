import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useCallback } from "react";
import { Spinner } from "@heroui/spinner";

import { PaginationMeta } from "../../../api/types.ts";
import { TaskResponse } from "../../../api/tasks/types.ts";

import TaskPriorityChip from "@/components/atoms/TaskPriorityChip.tsx";
import { TaskDueDateChip } from "@/components/atoms/TaskDueDateChip.tsx";
import { TaskStatusCheckbox } from "@/components/atoms/TaskStatusCheckbox.tsx";

type TasksTableProps = {
  currentPage: number;
  pagination?: PaginationMeta;
  tasks?: TaskResponse[];
  isLoading: boolean;
  setCurrentPage: (currentPage: number) => void;
  onUpdateTaskStatus: (taskId: string, status: boolean) => void;
};

export default function TasksTable({
  currentPage,
  pagination,
  tasks = [],
  isLoading,
  setCurrentPage,
  onUpdateTaskStatus,
}: TasksTableProps) {
  const renderCell = useCallback(
    (task: TaskResponse, columnKey: React.Key) => {
      const cellValue = task[columnKey as keyof TaskResponse];

      switch (columnKey) {
        case "name":
          return (
            <div>
              <p
                className={
                  task.completed ? "text-default-400 line-through" : ""
                }
              >
                {cellValue}
              </p>
              <p
                className={`text-xs text-default-500 mt-1 ${task.completed ? "text-default-300" : ""}`}
              >
                {task.description}
              </p>
            </div>
          );
        case "priority":
          return <TaskPriorityChip priorityLevel={task.priority} />;
        case "dueDate":
          return <TaskDueDateChip date={task.dueDate} />;
        case "completed":
          return (
            <TaskStatusCheckbox
              task={task}
              onChangeStatus={(status) => onUpdateTaskStatus(task.id, status)}
            />
          );
        default:
          return cellValue as string;
      }
    },
    [onUpdateTaskStatus],
  );

  return (
    <Table
      aria-label="Employee Tasks Table"
      bottomContent={
        <div className="flex w-full justify-end">
          <Pagination
            showControls
            initialPage={1}
            page={isLoading ? 1 : currentPage}
            total={pagination?.pages ?? 1}
            onChange={setCurrentPage}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">TASK</TableColumn>
        <TableColumn key="priority">PRIORITY</TableColumn>
        <TableColumn key="dueDate">DUE DATE</TableColumn>
        <TableColumn key="completed">STATUS</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent="No tasks to display."
        isLoading={isLoading}
        items={tasks}
        loadingContent={<Spinner size="sm" variant="spinner" />}
      >
        {(item) => (
          <TableRow
            key={item.id}
            className={item.completed ? "bg-default-50" : ""}
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
