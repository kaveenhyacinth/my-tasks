import { Expose } from 'class-transformer';

export class PaginationDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  size: number;

  @Expose()
  next: number;

  @Expose()
  prev: number;

  @Expose()
  totalPages: number;
}
