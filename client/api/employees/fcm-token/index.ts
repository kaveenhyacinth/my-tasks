import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  put: {
    reqBody: {
      token: string;
    };
    resBody: {
      data: any;
      message: string;
    };
  };
}>;
