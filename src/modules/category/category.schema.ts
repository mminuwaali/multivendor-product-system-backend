// Framework
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// External
import { Document } from 'mongoose';

// Internal
import { IBaseModel } from '@/common/interfaces/base-model.interface';

@Schema({ timestamps: true })
export class Category extends Document implements IBaseModel {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop()
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
