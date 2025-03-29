import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { Pagination } from '../../interfaces/pagination.interface';
import { Request } from 'express';

export const PaginationParams = createParamDecorator(
  (_data, ctx): Pagination => {
    const req = ctx.switchToHttp().getRequest() satisfies Request;
    let page = parseInt(req.query?.page as string);
    let size = parseInt(req.query?.size as string);

    if (!page) page = 1;
    if (!size) size = 10;

    if (isNaN(page) || page <= 0 || isNaN(size) || size <= 0) {
      throw new BadRequestException('Invalid pagination params');
    }

    // !DISCLAIMER: Maximum page size is 100
    if (size > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }

    const limit = size;
    const currentPage = page - 1;
    const offset = currentPage * limit;
    return { page, limit, size, offset };
  },
);
