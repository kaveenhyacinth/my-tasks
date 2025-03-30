import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { api } from "../../../api";

import TabContainer from "@/components/atoms/tab-container.tsx";
import { QUERY_EMPLOYEES_ALL } from "@/lib/constants.ts";
import EmployeesTable from "@/components/molecules/EmployeesTable.tsx";

export default function Employees() {
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <TabContainer>
      <div>
        <EmployeesTable
          currentPage={currentPage}
          employees={employees}
          isLoading={isLoading}
          pagination={paginationMeta}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </TabContainer>
  );
}
