// Framework
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

// Internal
import { Vendor } from './vendor.schema';
import { hashPassword } from '@/common/utils/hash.util';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorRepository } from './repository/vendor.repository';
import { BasePaginationService } from '@/common/pagination/base-pagination.service';
import { parseFilter, parseSort, IRawQuery } from '@/common/utils/query.parser';

@Injectable()
export class VendorService extends BasePaginationService {
  constructor(private readonly vendorRepository: VendorRepository) {
    super();
  }

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const password = createVendorDto.password;
    const passwordHash = await hashPassword(password);

    const vendorData: Partial<Vendor> = {
      email: createVendorDto.email,
      name: createVendorDto.full_name,
      phone: createVendorDto.phone,
      passwordHash: passwordHash,
    };

    return this.vendorRepository.create(vendorData);
  }

  async findByEmail(email: string): Promise<Vendor | null> {
    return this.vendorRepository.findOne({ email });
  }

  async findById(id: string): Promise<Vendor | null> {
    return this.vendorRepository.findById(id);
  }

  async findAll(query: IRawQuery) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const filter: mongoose.QueryFilter<Vendor> = parseFilter<Vendor>(
      query,
    ) as any;

    if (query.search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (filter as any).$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }

    const sort = parseSort(query.ordering);

    const data = await this.vendorRepository.findAll(
      filter,
      skip,
      pageSize,
      sort,
    );
    const total = await this.vendorRepository.count(filter);

    return this.paginate(data, total, page, pageSize);
  }
}
