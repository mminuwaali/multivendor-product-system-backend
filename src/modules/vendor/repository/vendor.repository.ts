// Framework
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// External
import { Model } from 'mongoose';

// Internal
import { BaseRepository } from '@/database/base.repository';
import { Vendor } from '../vendor.schema';

@Injectable()
export class VendorRepository extends BaseRepository<Vendor> {
  constructor(@InjectModel(Vendor.name) vendorModel: Model<Vendor>) {
    super(vendorModel);
  }
}
