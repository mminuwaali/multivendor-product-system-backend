// Framework
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// External
import { Document } from 'mongoose';

// Internal
import { IBaseModel } from '@/common/interfaces/base-model.interface';

@Schema({ timestamps: true })
export class Vendor extends Document implements IBaseModel {
  @Prop()
  deletedAt?: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  avatar?: string;

  @Prop()
  banner?: string;

  @Prop({ default: 0 })
  rating?: number;

  @Prop({ default: 0 })
  reviewsCount?: number;

  @Prop()
  location?: string;

  @Prop([String])
  tags?: string[];

  @Prop({ default: false })
  isFeatured?: boolean;

  @Prop({ enum: ['Hot', 'New', 'Featured'] })
  status?: string;

  @Prop({ required: true })
  passwordHash: string;

  createdAt: Date;
  updatedAt: Date;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
