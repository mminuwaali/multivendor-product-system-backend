// Framework
import { PartialType } from '@nestjs/swagger';

// Internal
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
