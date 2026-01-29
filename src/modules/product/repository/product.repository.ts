/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Framework
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// External
import mongoose, { Model } from 'mongoose';

// Internal
import { BaseRepository } from '@/database/base.repository';
import { Product } from '../product.schema';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(@InjectModel(Product.name) productModel: Model<Product>) {
    super(productModel);
  }

  async countByVendor(vendorId: string): Promise<number> {
    const filter: mongoose.QueryFilter<Product> = { vendorId };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.model.countDocuments(filter as any).exec();
  }

  async findByVendor(
    vendorId: string,
    skip: number,
    limit: number,
  ): Promise<Product[]> {
    const filter: mongoose.QueryFilter<Product> = { vendorId };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.model.find(filter as any).skip(skip).limit(limit).exec();
  }
}