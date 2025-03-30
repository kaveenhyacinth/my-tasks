import { DefineMethods } from "aspida";

import { TaskCreatePayload } from "./types";

export type Methods = DefineMethods<{
  post: {
    reqBody: TaskCreatePayload;
    resBody: {
      data: any;
      message: string;
    };
  };
}>;
