// Framework
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

// Internal
import { GetUser } from '@/common/decorators/get-user.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { Vendor } from '@/modules/vendor/vendor.schema';
import type { IRawQuery } from '@/common/utils/query.parser';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('public')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'ordering',
    required: false,
    description: 'Django-style ordering (e.g. -price,name)',
  })
  @ApiQuery({ name: 'vendorId', required: false })
  findAllPublic(
    @Query() query: IRawQuery,
    @Query('vendorId') vendorId?: string,
  ) {
    return this.productService.findAllPublic(query, vendorId);
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.productService.findOnePublic(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @GetUser() vendor: Vendor,
    @Body() createProductDto: CreateProductDto,
  ) {
    const vendorId = vendor._id.toString();
    return this.productService.create(vendorId, createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'ordering',
    required: false,
    description: 'Django-style ordering (e.g. -price,name)',
  })
  findAll(@GetUser() vendor: Vendor, @Query() query: IRawQuery) {
    const vendorId = vendor._id.toString();
    return this.productService.findAll(vendorId, query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@GetUser() vendor: Vendor, @Param('id') id: string) {
    const vendorId = vendor._id.toString();
    return this.productService.findOne(vendorId, id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @GetUser() vendor: Vendor,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const vendorId = vendor._id.toString();
    return this.productService.update(vendorId, id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@GetUser() vendor: Vendor, @Param('id') id: string) {
    const vendorId = vendor._id.toString();
    return this.productService.remove(vendorId, id);
  }
}
