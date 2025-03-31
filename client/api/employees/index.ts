import { DefineMethods } from "aspida";

import { PaginationMeta, PaginationQuery } from "../types";

import { EmployeeResponse } from "./types";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: {
        employees: EmployeeResponse[];
        meta: PaginationMeta;
      };
    };
    query: PaginationQuery;
  };
}>;
