// Framework
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// External
import { Document, Schema as MongooseSchema } from 'mongoose';

// Internal
import { IBaseModel } from '@/common/interfaces/base-model.interface';
import { Vendor } from '../vendor/vendor.schema';

@Schema({ timestamps: true })
export class Product extends Document implements IBaseModel {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: string; // Storing ID, can populate

  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop()
  deletedAt?: Date;

  @Prop({ required: true })
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  image?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  rating?: number;

  @Prop()
  status?: string;

  @Prop({ default: 0 })
  reviewsCount?: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Vendor.name,
    required: true,
  })
  vendorId: Vendor | string;

  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
