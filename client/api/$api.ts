import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_46m3yh } from './analytics/task-completion-overview';
import type { Methods as Methods_19l45fu } from './auth/login';
import type { Methods as Methods_hyqrhb } from './employees';
import type { Methods as Methods_16nqtxi } from './employees/me';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/analytics/task-completion-overview';
  const PATH1 = '/auth/login';
  const PATH2 = '/employees';
  const PATH3 = '/employees/me';
  const GET = 'GET';
  const POST = 'POST';

  return {
    analytics: {
      task_completion_overview: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_46m3yh['get']['resBody']>(prefix, PATH0, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_46m3yh['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
    auth: {
      login: {
        post: (option: { body: Methods_19l45fu['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option: { body: Methods_19l45fu['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
    employees: {
      me: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_16nqtxi['get']['resBody']>(prefix, PATH3, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_16nqtxi['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      get: (option: { query: Methods_hyqrhb['get']['query'], config?: T | undefined }) =>
        fetch<Methods_hyqrhb['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option: { query: Methods_hyqrhb['get']['query'], config?: T | undefined }) =>
        fetch<Methods_hyqrhb['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_hyqrhb['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
