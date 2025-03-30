import { useQuery } from "@tanstack/react-query";
import { lazy, useMemo, useState } from "react";

import { api } from "../../../api";
import { EmployeeResponse } from "../../../api/employees/types.ts";

import TabContainer from "@/components/atoms/TabContainer.tsx";
import { QUERY_EMPLOYEES_ALL } from "@/lib/constants.ts";
import EmployeesTable from "@/components/molecules/EmployeesTable.tsx";

const EmployeeUpdateModal = lazy(
  () => import("@/components/molecules/modals/EmployeeUpdateModal.tsx"),
);

export default function EmployeesModule() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmployeeUpdateModalOpen, setIsEmployeeUpdateModalOpen] =
    useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeResponse | null>(null);

  const { isLoading, data: employeesRes } = useQuery({
    queryKey: [QUERY_EMPLOYEES_ALL, currentPage],
    queryFn: () =>
      api.employees.$get({ query: { page: currentPage, size: 10 } }),
  });

  const employees = useMemo(
    () => employeesRes?.data.employees ?? [],
    [employeesRes?.data],
  );

  const paginationMeta = useMemo(
    () => employeesRes?.data.meta,
    [employeesRes?.data],
  );

  const handleOpenEmployeeUpdateModal = (employee: EmployeeResponse) => {
    setSelectedEmployee(employee);
    setIsEmployeeUpdateModalOpen(true);
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
          onOpenUpdateModal={handleOpenEmployeeUpdateModal}
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
    </TabContainer>
  );
}
