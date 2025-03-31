import type { AspidaClient } from "aspida";
import type { Methods as Methods_46m3yh } from "./analytics/task-completion-overview";
import type { Methods as Methods_19l45fu } from "./auth/login";
import type { Methods as Methods_1lyzgjt } from "./departments";
import type { Methods as Methods_hyqrhb } from "./employees";
import type { Methods as Methods_10lkvo5 } from "./employees/_employeeId@string";
import type { Methods as Methods_1xirj4y } from "./employees/fcm-token";
import type { Methods as Methods_16nqtxi } from "./employees/me";
import type { Methods as Methods_w6o6q4 } from "./tasks";
import type { Methods as Methods_1vagdt3 } from "./tasks/_taskId@string";

import { dataToURLString } from "aspida";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? "" : baseURL).replace(/\/$/, "");
  const PATH0 = "/analytics/task-completion-overview";
  const PATH1 = "/auth/login";
  const PATH2 = "/departments";
  const PATH3 = "/employees";
  const PATH4 = "/employees/fcm-token";
  const PATH5 = "/employees/me";
  const PATH6 = "/tasks";
  const GET = "GET";
  const POST = "POST";
  const PUT = "PUT";
  const DELETE = "DELETE";
  const PATCH = "PATCH";

  return {
    analytics: {
      task_completion_overview: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_46m3yh["get"]["resBody"]>(
            prefix,
            PATH0,
            GET,
            option,
          ).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_46m3yh["get"]["resBody"]>(prefix, PATH0, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
    auth: {
      login: {
        post: (option: {
          body: Methods_19l45fu["post"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<Methods_19l45fu["post"]["resBody"]>(
            prefix,
            PATH1,
            POST,
            option,
          ).json(),
        $post: (option: {
          body: Methods_19l45fu["post"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<Methods_19l45fu["post"]["resBody"]>(prefix, PATH1, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
    departments: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1lyzgjt["get"]["resBody"]>(
          prefix,
          PATH2,
          GET,
          option,
        ).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1lyzgjt["get"]["resBody"]>(prefix, PATH2, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    employees: {
      _employeeId: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`;

        return {
          put: (option: {
            body: Methods_10lkvo5["put"]["reqBody"];
            config?: T | undefined;
          }) =>
            fetch<Methods_10lkvo5["put"]["resBody"]>(
              prefix,
              prefix1,
              PUT,
              option,
            ).json(),
          $put: (option: {
            body: Methods_10lkvo5["put"]["reqBody"];
            config?: T | undefined;
          }) =>
            fetch<Methods_10lkvo5["put"]["resBody"]>(
              prefix,
              prefix1,
              PUT,
              option,
            )
              .json()
              .then((r) => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_10lkvo5["delete"]["resBody"]>(
              prefix,
              prefix1,
              DELETE,
              option,
            ).json(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_10lkvo5["delete"]["resBody"]>(
              prefix,
              prefix1,
              DELETE,
              option,
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      fcm_token: {
        put: (option: {
          body: Methods_1xirj4y["put"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<Methods_1xirj4y["put"]["resBody"]>(
            prefix,
            PATH4,
            PUT,
            option,
          ).json(),
        $put: (option: {
          body: Methods_1xirj4y["put"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<Methods_1xirj4y["put"]["resBody"]>(prefix, PATH4, PUT, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
      me: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_16nqtxi["get"]["resBody"]>(
            prefix,
            PATH5,
            GET,
            option,
          ).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_16nqtxi["get"]["resBody"]>(prefix, PATH5, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH5}`,
      },
      get: (option: {
        query: Methods_hyqrhb["get"]["query"];
        config?: T | undefined;
      }) =>
        fetch<Methods_hyqrhb["get"]["resBody"]>(
          prefix,
          PATH3,
          GET,
          option,
        ).json(),
      $get: (option: {
        query: Methods_hyqrhb["get"]["query"];
        config?: T | undefined;
      }) =>
        fetch<Methods_hyqrhb["get"]["resBody"]>(prefix, PATH3, GET, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | {
              method?: "get" | undefined;
              query: Methods_hyqrhb["get"]["query"];
            }
          | undefined,
      ) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ""}`,
    },
    tasks: {
      _taskId: (val1: string) => {
        const prefix1 = `${PATH6}/${val1}`;

        return {
          patch: (option: {
            body: Methods_1vagdt3["patch"]["reqBody"];
            config?: T | undefined;
          }) =>
            fetch<Methods_1vagdt3["patch"]["resBody"]>(
              prefix,
              prefix1,
              PATCH,
              option,
            ).json(),
          $patch: (option: {
            body: Methods_1vagdt3["patch"]["reqBody"];
            config?: T | undefined;
          }) =>
            fetch<Methods_1vagdt3["patch"]["resBody"]>(
              prefix,
              prefix1,
              PATCH,
              option,
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      post: (option: {
        body: Methods_w6o6q4["post"]["reqBody"];
        config?: T | undefined;
      }) =>
        fetch<Methods_w6o6q4["post"]["resBody"]>(
          prefix,
          PATH6,
          POST,
          option,
        ).json(),
      $post: (option: {
        body: Methods_w6o6q4["post"]["reqBody"];
        config?: T | undefined;
      }) =>
        fetch<Methods_w6o6q4["post"]["resBody"]>(prefix, PATH6, POST, option)
          .json()
          .then((r) => r.body),
      get: (option: {
        query: Methods_w6o6q4["get"]["query"];
        config?: T | undefined;
      }) =>
        fetch<Methods_w6o6q4["get"]["resBody"]>(
          prefix,
          PATH6,
          GET,
          option,
        ).json(),
      $get: (option: {
        query: Methods_w6o6q4["get"]["query"];
        config?: T | undefined;
      }) =>
        fetch<Methods_w6o6q4["get"]["resBody"]>(prefix, PATH6, GET, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | {
              method?: "get" | undefined;
              query: Methods_w6o6q4["get"]["query"];
            }
          | undefined,
      ) =>
        `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ""}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
