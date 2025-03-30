import { Expose } from 'class-transformer';

export class PaginationDto {
  @Expose()
  total: number;

  @Expose()
  current: number;

  @Expose()
  size: number;

  @Expose()
  next: number;

  @Expose()
  prev: number;

  @Expose()
  pages: number;
}
