import { useQuery } from "@tanstack/react-query";
import { lazy, useMemo } from "react";

import { api } from "../../../api";

import { QUERY_ANALYTICS_TASK_COMPLETION_OVERVIEW } from "@/lib/constants.ts";
import { GlobalPreloader } from "@/components/molecules/GlobalPreloader.tsx";
import TabContainer from "@/components/atoms/TabContainer.tsx";

const EmployeeAnalyticsCard = lazy(
  () => import(`@/components/molecules/EmployeeAnalyticsCard.tsx`),
);

export default function AnalyticsModule() {
  const { isLoading, data: analyticsResponse } = useQuery({
    queryKey: [QUERY_ANALYTICS_TASK_COMPLETION_OVERVIEW],
    queryFn: () => api.analytics.task_completion_overview.$get(),
  });

  const analytics = useMemo(
    () => analyticsResponse?.data.result ?? [],
    [analyticsResponse],
  );

  if (isLoading) {
    return <GlobalPreloader />;
  }

  return (
    <TabContainer>
      <div className="flex gap-4 flex-wrap">
        {analytics?.map((employee) => (
          <EmployeeAnalyticsCard key={employee.username} employee={employee} />
        ))}
      </div>
    </TabContainer>
  );
}
