import { DefineMethods } from "aspida";

import { LoginResponse } from "./types.ts";

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      username: string;
      password: string;
    };
    resBody: {
      data: LoginResponse;
    };
  };
}>;
