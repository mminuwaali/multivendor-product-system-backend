/* eslint-disable @typescript-eslint/no-unsafe-argument */
// External
import mongoose, { Document, Model, UpdateQuery, SortOrder } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async count(filter: mongoose.QueryFilter<T> = {}): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.model.countDocuments(filter as any).exec();
  }

  async create(doc: Partial<T>): Promise<T> {
    const createdEntity = new this.model(doc);
    return createdEntity.save();
  }

  async findAll(
    filter: mongoose.QueryFilter<T> = {},
    skip = 0,
    limit = 10,
    sort: string | { [key: string]: SortOrder } = { createdAt: -1 },
  ): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.model.find(filter as any).sort(sort).skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: mongoose.QueryFilter<T>): Promise<T | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.model.findOne(filter as any).exec();
  }

  async softDelete(id: string): Promise<T | null> {
    const updateQuery = { deletedAt: new Date() } as unknown as UpdateQuery<T>;
    return this.model.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
  }

  async update(id: string, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}