export type PaginationParams = {
  page: number;
  size: number;
};

export type PaginationMeta = {
  total: number;
  current: number;
  size: number;
  next: number | null;
  prev: number | null;
  pages: number;
};
