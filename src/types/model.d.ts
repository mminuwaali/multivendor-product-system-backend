declare type UserID = string;
declare type VendorID = string;
declare type ProductID = string;

declare interface IBaseModel {
  _id: string | object; // Mongoose _id can be ObjectId or string
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
