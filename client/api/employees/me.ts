import { DefineMethods } from "aspida";

import { EmployeeResponse } from "./types.ts";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: {
        employee: EmployeeResponse;
      };
    };
  };
}>;
