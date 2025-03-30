import { Pagination } from '../interfaces/pagination.interface';
import { serialize } from './serializer.util';
import { PaginationDto } from '../common/dtos/pagination.dto';

export class PaginationUtil {
  constructor(private pagination: Pagination) {}

  getNextPage(total: number): number | null {
    const { offset, limit } = this.pagination;
    return total > offset + limit ? offset + limit + 1 : null;
  }

  getPrevPage(): number | null {
    const { page } = this.pagination;
    return page - 1 > 0 ? page - 1 : null;
  }

  getTotalPages(total: number): number {
    return Math.ceil(total / this.pagination.size);
  }

  getSerializedPaginationMeta(total: number): PaginationDto {
    return serialize(PaginationDto, {
      total,
      current: this.pagination.page,
      size: this.pagination.size,
      next: this.getNextPage(total),
      prev: this.getPrevPage(),
      pages: this.getTotalPages(total),
    });
  }
}
