/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Framework
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

// Internal
import { BasePaginationService } from '@/common/pagination/base-pagination.service';
import { parseFilter, parseSort, IRawQuery } from '@/common/utils/query.parser';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService extends BasePaginationService {
  constructor(private readonly productRepository: ProductRepository) {
    super();
  }

  async create(
    vendorId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const productData: Partial<Product> = {
      category: createProductDto.category,
      price: createProductDto.price,
      title: createProductDto.title,
      vendorId: vendorId,
    };

    return this.productRepository.create(productData);
  }

  async findAll(vendorId: string, query: IRawQuery) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    // Start with strict vendor filter
    const baseFilter: mongoose.QueryFilter<Product> = { vendorId };

    // Parse dynamic filters

    const dynamicFilter: any = parseFilter<Product>(query);

    // Merge filters
    const filter: mongoose.QueryFilter<Product> = {
      ...dynamicFilter,
      ...baseFilter,
    };

    if (query.search) {
      (filter as any).$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    const sort = parseSort(query.ordering);

    const data = await this.productRepository.findAll(
      filter,
      skip,
      pageSize,
      sort,
    );
    const total = await this.productRepository.count(filter);

    return this.paginate(data, total, page, pageSize);
  }

  async findOne(vendorId: string, id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ _id: id, vendorId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async remove(vendorId: string, id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ _id: id, vendorId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const deleted = await this.productRepository.softDelete(id);
    return deleted as Product;
  }

  async update(
    vendorId: string,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ _id: id, vendorId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const updated = await this.productRepository.update(id, updateProductDto);
    return updated as Product;
  }

  async findAllPublic(query: IRawQuery, vendorId?: string) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter = parseFilter<Product>(query) as any;

    if (vendorId) {
      filter.vendorId = vendorId;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    const sort = parseSort(query.ordering);

    const data = await this.productRepository.findAll(
      filter,
      skip,
      pageSize,
      sort,
    );
    const total = await this.productRepository.count(filter);

    return this.paginate(data, total, page, pageSize);
  }

  async findOnePublic(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
