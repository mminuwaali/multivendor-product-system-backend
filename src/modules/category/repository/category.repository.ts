// Framework
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// External
import { Model } from 'mongoose';

// Internal
import { BaseRepository } from '@/database/base.repository';
import { Category } from '../category.schema';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(@InjectModel(Category.name) categoryModel: Model<Category>) {
    super(categoryModel);
  }
}
