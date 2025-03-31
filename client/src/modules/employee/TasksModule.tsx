import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { api } from "../../../api";
import { TaskOrderQuery, TaskSortQuery } from "../../../api/tasks/types.ts";

import { QUERY_TASKS_ALL } from "@/lib/constants.ts";
import TasksTable from "@/components/molecules/TasksTable.tsx";
import SortSelector from "@/components/molecules/SortSelector.tsx";

export default function TasksModule() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TaskSortQuery>("dueDate");
  const [sortOrder, setSortOrder] = useState<TaskOrderQuery>("asc");

  const { isLoading, data: tasksRes } = useQuery({
    queryKey: [QUERY_TASKS_ALL, currentPage, sortBy, sortOrder],
    queryFn: () =>
      api.tasks.$get({
        query: {
          page: currentPage,
          size: 10,
          sort: sortBy as any,
          order: sortOrder,
        },
      }),
  });

  const tasks = useMemo(
    () => tasksRes?.data.tasks ?? [],
    [tasksRes?.data.tasks],
  );

  const paginationMeta = useMemo(
    () => tasksRes?.data.meta,
    [tasksRes?.data.meta],
  );

  return (
    <div className="w-full">
      <section className="w-full flex justify-between items-center mb-5">
        <div />
        <div className="">
          <SortSelector
            setSortKey={setSortBy}
            setSortOrder={setSortOrder}
            sortKey={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </section>
      <TasksTable
        currentPage={currentPage}
        isLoading={isLoading}
        pagination={paginationMeta}
        setCurrentPage={setCurrentPage}
        tasks={tasks}
      />
    </div>
  );
}
