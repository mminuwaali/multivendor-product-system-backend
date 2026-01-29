// Framework
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

// Internal
import { BasePaginationService } from '@/common/pagination/base-pagination.service';
import { CategoryRepository } from './repository/category.repository';
import { parseFilter, parseSort, IRawQuery } from '@/common/utils/query.parser';
import { Category } from './category.schema';

@Injectable()
export class CategoryService extends BasePaginationService {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super();
  }

  async findAll(query: IRawQuery) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const filter: mongoose.QueryFilter<Category> = parseFilter<Category>(query) as any;

    if (query.search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (filter as any).$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    const sort = parseSort(query.ordering);

    const data = await this.categoryRepository.findAll(filter, skip, pageSize, sort);
    const total = await this.categoryRepository.count(filter);

    return this.paginate(data, total, page, pageSize);
  }

  async findOne(id: string) {
    return this.categoryRepository.findById(id);
  }
}