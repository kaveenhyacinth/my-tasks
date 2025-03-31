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

type TasksTableProps = {
  currentPage: number;
  pagination?: PaginationMeta;
  tasks?: TaskResponse[];
  isLoading: boolean;
  setCurrentPage: (currentPage: number) => void;
};

export default function TasksTable({
  currentPage,
  pagination,
  tasks = [],
  isLoading,
  setCurrentPage,
}: TasksTableProps) {
  const renderCell = useCallback((task: TaskResponse, columnKey: React.Key) => {
    const cellValue = task[columnKey as keyof TaskResponse];

    return <div>{cellValue as string}</div>;
  }, []);

  return (
    <Table
      aria-label="Employee Tasks Table"
      bottomContent={
        <div className="flex w-full justify-end">
          <Pagination
            isCompact
            showControls
            showShadow
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
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
