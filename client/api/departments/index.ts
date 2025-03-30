import { DefineMethods } from "aspida";

import { DepartmentResponse } from "./types";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: {
        departments: DepartmentResponse[];
      };
    };
  };
}>;
