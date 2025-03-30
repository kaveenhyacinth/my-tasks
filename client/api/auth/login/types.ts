export enum ROLE_TYPE {
  BASE = "base",
  ADMIN = "admin",
}

export type LoginResponse = {
  token: string;
  role: ROLE_TYPE;
};
