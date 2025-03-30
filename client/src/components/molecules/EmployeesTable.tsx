import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import React, { useCallback } from "react";

import { PaginationMeta } from "../../../api/types.ts";
import { EmployeeResponse } from "../../../api/employees/types.ts";

import { AssignIcon, EditIcon, TrashIcon } from "@/components/icons.tsx";

type EmployeesTableProps = {
  currentPage: number;
  pagination?: PaginationMeta;
  employees?: EmployeeResponse[];
  isLoading: boolean;
  setCurrentPage: (currentPage: number) => void;
  onOpenUpdateModal: (employee: EmployeeResponse) => void;
};

export default function EmployeesTable({
  currentPage,
  pagination,
  employees = [],
  isLoading,
  setCurrentPage,
  onOpenUpdateModal,
}: EmployeesTableProps) {
  const renderCell = useCallback(
    (employee: EmployeeResponse, columnKey: React.Key) => {
      const cellValue = employee[columnKey as keyof EmployeeResponse];

      if (columnKey === "actions") {
        return (
          <div className="realative w-full flex items-center gap-2">
            <span className="text-lg cursor-pointer active:opacity-50">
              <EditIcon size={18} onClick={() => onOpenUpdateModal(employee)} />
            </span>
            <span className="text-lg cursor-pointer active:opacity-50">
              <AssignIcon size={18} />
            </span>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <TrashIcon size={18} />
            </span>
          </div>
        );
      }

      return <div>{cellValue as string}</div>;
    },
    [],
  );

  return (
    <Table
      aria-label="Example table with client side pagination"
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
        <TableColumn key="id">EMPLOYEE ID</TableColumn>
        <TableColumn key="firstName">FIRST NAME</TableColumn>
        <TableColumn key="lastName">LAST NAME</TableColumn>
        <TableColumn key="username">USERNAME</TableColumn>
        <TableColumn key="department">DEPARTMENT</TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>
      {isLoading ? (
        <TableBody emptyContent={<Spinner size="sm" variant="spinner" />}>
          {[]}
        </TableBody>
      ) : (
        <>
          {employees.length ? (
            <TableBody items={employees}>
              {(item) => (
                <TableRow key={item.username}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          )}
        </>
      )}
    </Table>
  );
}
