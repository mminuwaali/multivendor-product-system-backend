// Framework
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Internal
import { VendorRepository } from './repository/vendor.repository';
import { VendorController } from './vendor.controller';
import { Vendor, VendorSchema } from './vendor.schema';
import { VendorService } from './vendor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
  ],
  controllers: [VendorController],
  providers: [VendorRepository, VendorService],
  exports: [VendorService],
})
export class VendorModule {}
