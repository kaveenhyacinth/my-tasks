import { DefineMethods } from "aspida";

import { TaskUpdatePayload } from "./types";

export type Methods = DefineMethods<{
  patch: {
    reqBody: TaskUpdatePayload;
    resBody: {
      data: any;
      message: string;
    };
  };
}>;
