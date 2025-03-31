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
import { EmployeeResponse } from "../../../api/employees/types.ts";

import { AssignIcon, EditIcon, TrashIcon } from "@/components/icons.tsx";
import { MODAL_KEY } from "@/types";

type EmployeesTableProps = {
  currentPage: number;
  pagination?: PaginationMeta;
  employees?: EmployeeResponse[];
  isLoading: boolean;
  setCurrentPage: (currentPage: number) => void;
  onOpenModal: (key: MODAL_KEY, employee: EmployeeResponse) => void;
  onChangePageSize: (size: number) => void;
};

export default function EmployeesTable({
  currentPage,
  pagination,
  employees = [],
  isLoading,
  setCurrentPage,
  onOpenModal,
  onChangePageSize,
}: EmployeesTableProps) {
  const renderCell = useCallback(
    (employee: EmployeeResponse, columnKey: React.Key) => {
      const cellValue = employee[columnKey as keyof EmployeeResponse];

      if (columnKey === "actions") {
        return (
          <div className="realative w-full flex items-center gap-2 lg:gap-3">
            <span className="text-lg cursor-pointer active:opacity-50">
              <EditIcon
                size={20}
                onClick={() => onOpenModal(MODAL_KEY.EMPLOYEE_UPDATE, employee)}
              />
            </span>
            <span className="text-lg cursor-pointer active:opacity-50">
              <AssignIcon
                size={20}
                onClick={() => onOpenModal(MODAL_KEY.TASK_ASSIGN, employee)}
              />
            </span>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <TrashIcon
                size={20}
                onClick={() => onOpenModal(MODAL_KEY.EMPLOYEE_DELETE, employee)}
              />
            </span>
          </div>
        );
      }

      return cellValue as string;
    },
    [onOpenModal],
  );

  const handleOnChangePageSize = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChangePageSize(Number(e.target.value));
    },
    [],
  );

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full items-end justify-between">
          {(pagination?.pages ?? 1) > 1 ? (
            <Pagination
              showControls
              initialPage={1}
              page={isLoading ? 1 : currentPage}
              total={pagination?.pages ?? 1}
              onChange={setCurrentPage}
            />
          ) : (
            <div />
          )}
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={handleOnChangePageSize}
            >
              <option value="5">5</option>
              <option selected value="10">
                10
              </option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="employeeId">EMPLOYEE ID</TableColumn>
        <TableColumn key="firstName">FIRST NAME</TableColumn>
        <TableColumn key="lastName">LAST NAME</TableColumn>
        <TableColumn key="username">USERNAME</TableColumn>
        <TableColumn key="department">DEPARTMENT</TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent="No tasks to display."
        isLoading={isLoading}
        items={employees}
        loadingContent={<Spinner size="sm" variant="spinner" />}
      >
        {(item) => (
          <TableRow key={item.username}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
