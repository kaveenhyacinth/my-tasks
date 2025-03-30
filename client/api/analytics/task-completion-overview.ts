import { DefineMethods } from "aspida";

import { EmployeeTasksAnalyticsResponse } from "./type";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: {
        result: EmployeeTasksAnalyticsResponse[];
      };
    };
  };
}>;
