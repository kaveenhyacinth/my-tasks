import { DefineMethods } from "aspida";

import { EmployeeResponse } from "./type";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: {
        employee: EmployeeResponse;
      };
    };
  };
}>;
