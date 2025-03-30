import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_46m3yh } from './analytics/task-completion-overview';
import type { Methods as Methods_19l45fu } from './auth/login';
import type { Methods as Methods_1lyzgjt } from './departments';
import type { Methods as Methods_hyqrhb } from './employees';
import type { Methods as Methods_10lkvo5 } from './employees/_employeeId@string';
import type { Methods as Methods_16nqtxi } from './employees/me';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/analytics/task-completion-overview';
  const PATH1 = '/auth/login';
  const PATH2 = '/departments';
  const PATH3 = '/employees';
  const PATH4 = '/employees/me';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';

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
    departments: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1lyzgjt['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1lyzgjt['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    employees: {
      _employeeId: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`;

        return {
          put: (option: { body: Methods_10lkvo5['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_10lkvo5['put']['resBody']>(prefix, prefix1, PUT, option).json(),
          $put: (option: { body: Methods_10lkvo5['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_10lkvo5['put']['resBody']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      me: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_16nqtxi['get']['resBody']>(prefix, PATH4, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_16nqtxi['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
      get: (option: { query: Methods_hyqrhb['get']['query'], config?: T | undefined }) =>
        fetch<Methods_hyqrhb['get']['resBody']>(prefix, PATH3, GET, option).json(),
      $get: (option: { query: Methods_hyqrhb['get']['query'], config?: T | undefined }) =>
        fetch<Methods_hyqrhb['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_hyqrhb['get']['query'] } | undefined) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
