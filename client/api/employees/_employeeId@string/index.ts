import { DefineMethods } from "aspida";

import { EmployeeUpdatePayload } from "./types";

export type Methods = DefineMethods<{
  put: {
    reqBody: EmployeeUpdatePayload;
    resBody: {
      data: any;
      message: string;
    };
  };
}>;
