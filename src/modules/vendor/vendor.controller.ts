// Framework
import { Controller, Get, UseGuards, Query, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

// Internal
import { GetUser } from '@/common/decorators/get-user.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import type { IRawQuery } from '@/common/utils/query.parser';
import { Vendor } from './vendor.schema';
import { VendorService } from './vendor.service';

@ApiTags('vendors')
@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@GetUser() vendor: Vendor) {
    return vendor;
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'ordering',
    required: false,
    description: 'Django-style ordering (e.g. -createdAt,name)',
  })
  findAll(@Query() query: IRawQuery) {
    return this.vendorService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findById(id);
  }
}
