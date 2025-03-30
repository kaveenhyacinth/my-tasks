import { DefineMethods } from "aspida";

import { EmployeeTasksAnalyticsResponse } from "./types.ts";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: {
        result: EmployeeTasksAnalyticsResponse[];
      };
    };
  };
}>;
