// Framework
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Internal
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class ProductModule {}
