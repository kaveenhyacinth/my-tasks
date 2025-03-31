import { useQuery } from "@tanstack/react-query";
import { lazy, useMemo, useState } from "react";

import { api } from "../../../api";
import { EmployeeResponse } from "../../../api/employees/types.ts";

import TabContainer from "@/components/atoms/TabContainer.tsx";
import { QUERY_EMPLOYEES_ALL } from "@/lib/constants.ts";
import EmployeesTable from "@/components/molecules/EmployeesTable.tsx";
import TaskAssignModal from "@/components/molecules/modals/TaskAssignModal.tsx";
import { MODAL_KEY } from "@/types";

const EmployeeUpdateModal = lazy(
  () => import("@/components/molecules/modals/EmployeeUpdateModal.tsx"),
);
const EmployeeDeleteModal = lazy(
  () => import("@/components/organisms/modals/EmployeeDeleteModal.tsx"),
);

export default function EmployeesModule() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isEmployeeUpdateModalOpen, setIsEmployeeUpdateModalOpen] =
    useState(false);
  const [isEmployeeDeleteModalOpen, setIsEmployeeDeleteModalOpen] =
    useState(false);
  const [isTaskAssignModalOpen, setIsTaskAssignModalOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeResponse | null>(null);

  const { isLoading, data: employeesRes } = useQuery({
    queryKey: [QUERY_EMPLOYEES_ALL, currentPage, pageSize],
    queryFn: () =>
      api.employees.$get({ query: { page: currentPage, size: pageSize } }),
  });

  const employees = useMemo(
    () => employeesRes?.data.employees ?? [],
    [employeesRes?.data],
  );

  const paginationMeta = useMemo(
    () => employeesRes?.data.meta,
    [employeesRes?.data],
  );

  const handleOpenModal = (key: MODAL_KEY, employee: EmployeeResponse) => {
    setSelectedEmployee(employee);
    switch (key) {
      case MODAL_KEY.EMPLOYEE_UPDATE:
        setIsEmployeeUpdateModalOpen(true);
        break;
      case MODAL_KEY.EMPLOYEE_DELETE:
        setIsEmployeeDeleteModalOpen(true);
        break;
      case MODAL_KEY.TASK_ASSIGN:
        setIsTaskAssignModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <TabContainer>
      <div>
        <EmployeesTable
          currentPage={currentPage}
          employees={employees}
          isLoading={isLoading}
          pagination={paginationMeta}
          setCurrentPage={setCurrentPage}
          onChangePageSize={setPageSize}
          onOpenModal={handleOpenModal}
        />
      </div>
      <EmployeeUpdateModal
        employee={selectedEmployee!}
        isOpen={!!selectedEmployee?.id && isEmployeeUpdateModalOpen}
        onOpenChange={(isOpen) => {
          setIsEmployeeUpdateModalOpen(isOpen);
          if (!isOpen) {
            setSelectedEmployee(null);
          }
        }}
      />
      <EmployeeDeleteModal
        employee={selectedEmployee!}
        isOpen={!!selectedEmployee?.id && isEmployeeDeleteModalOpen}
        onOpenChange={(isOpen) => {
          setIsEmployeeDeleteModalOpen(isOpen);
          if (!isOpen) {
            setSelectedEmployee(null);
          }
        }}
      />
      <TaskAssignModal
        employee={selectedEmployee!}
        isOpen={!!selectedEmployee?.id && isTaskAssignModalOpen}
        onOpenChange={(isOpen) => {
          setIsTaskAssignModalOpen(isOpen);
          if (!isOpen) {
            setSelectedEmployee(null);
          }
        }}
      />
    </TabContainer>
  );
}
