// Framework
import { Injectable } from '@nestjs/common';

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export abstract class BasePaginationService {
  protected paginate<T>(
    data: T[],
    total: number,
    page: number,
    pageSize: number,
  ): IPaginatedResponse<T> {
    const totalPages = Math.ceil(total / pageSize);
    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages,
      },
    };
  }
}
