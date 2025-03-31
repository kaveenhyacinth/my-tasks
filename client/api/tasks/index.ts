import { DefineMethods } from "aspida";

import { PaginationMeta, PaginationQuery } from "../types.ts";

import { TaskCreatePayload, TaskQuery, TaskResponse } from "./types";

export type Methods = DefineMethods<{
  post: {
    reqBody: TaskCreatePayload;
    resBody: {
      data: any;
      message: string;
    };
  };

  get: {
    query: TaskQuery & PaginationQuery;
    resBody: {
      data: {
        tasks: TaskResponse[];
        meta: PaginationMeta;
      };
    };
  };
}>;
