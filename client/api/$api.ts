import type { AspidaClient } from 'aspida';
import type { Methods as Methods_19l45fu } from './auth/login';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/login';
  const POST = 'POST';

  return {
    auth: {
      login: {
        post: (option: { body: Methods_19l45fu['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods_19l45fu['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_19l45fu['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
