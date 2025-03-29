import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      username: string;
      password: string;
    };
    resBody: {
      data: {
        token: string;
      };
    };
  };
}>;
