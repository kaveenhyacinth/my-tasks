import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/toast";
import { Alert } from "@heroui/alert";
import { Spacer } from "@heroui/spacer";

import { api } from "../../../api";
import { TaskOrderQuery, TaskSortQuery } from "../../../api/tasks/types.ts";
import { TaskUpdatePayload } from "../../../api/tasks/_taskId@string/types.ts";

import { QUERY_TASKS_ALL, STORAGE_KEY_ALERT } from "@/lib/constants.ts";
import TasksTable from "@/components/molecules/TasksTable.tsx";
import SortSelector from "@/components/molecules/SortSelector.tsx";
import { subtitle, title } from "@/components/primitives.ts";
import { TASK_ALERT_STATUS } from "@/types";

export default function TasksModule() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<TaskSortQuery>("dueDate");
  const [sortOrder, setSortOrder] = useState<TaskOrderQuery>("asc");
  const [isAlertVisible, setAlertVisible] = useState<boolean>(false);

  const { isLoading, data: tasksRes } = useQuery({
    queryKey: [QUERY_TASKS_ALL, currentPage, sortBy, sortOrder, pageSize],
    queryFn: () =>
      api.tasks.$get({
        query: {
          page: currentPage,
          size: pageSize,
          sort: sortBy as any,
          order: sortOrder,
        },
      }),
  });

  const taskUpdateMutation = useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: TaskUpdatePayload;
    }) =>
      api.tasks._taskId(taskId).$patch({
        body: payload,
      }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_TASKS_ALL] });
      addToast({
        title: data.message ?? "Task has been updated.",
        color: "success",
        icon: "success",
      });
    },
  });

  const tasks = useMemo(
    () => tasksRes?.data.tasks ?? [],
    [tasksRes?.data.tasks],
  );

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.completed)?.length,
    [tasks],
  );

  const paginationMeta = useMemo(
    () => tasksRes?.data.meta,
    [tasksRes?.data.meta],
  );

  const checkAlert = useCallback(() => {
    const alertValue = localStorage.getItem(STORAGE_KEY_ALERT);

    setAlertVisible(alertValue === TASK_ALERT_STATUS.VISIBLE);
  }, [setAlertVisible]);

  const handleOnCloseAlert = useCallback(() => {
    setAlertVisible(false);
    localStorage.setItem(STORAGE_KEY_ALERT, TASK_ALERT_STATUS.HIDDEN);
  }, []);

  const handleOnUpdateTaskStatus = (taskId: string, completed: boolean) => {
    taskUpdateMutation.mutate({
      taskId,
      payload: { completed },
    });
  };

  useEffect(() => {
    checkAlert();
  }, [checkAlert]);

  return (
    <div className="w-full">
      <section>
        <h1 className={title()}>Assigned Tasks</h1>
        <p className={subtitle()}>Manage and track your assigned tasks</p>
      </section>
      <div>
        <Spacer y={4} />
        <Alert
          hideIconWrapper
          color="primary"
          isVisible={isAlertVisible}
          title="You can sort your tasks by due date or priority. Mark tasks as completed when you finish them."
          variant="faded"
          onClose={handleOnCloseAlert}
        />
        <Spacer y={4} />
      </div>
      <section className="w-full flex justify-between items-end">
        <span className="text-default-400 text-small">
          {tasks.length} active tasks, {completedTasksCount} completed
        </span>
        <div className="">
          <SortSelector
            setSortKey={setSortBy}
            setSortOrder={setSortOrder}
            sortKey={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </section>
      <Spacer y={3} />
      <TasksTable
        currentPage={currentPage}
        isLoading={isLoading}
        pagination={paginationMeta}
        setCurrentPage={setCurrentPage}
        tasks={tasks}
        onChangePageSize={setPageSize}
        onUpdateTaskStatus={handleOnUpdateTaskStatus}
      />
    </div>
  );
}
