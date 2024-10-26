import { Types } from "mongoose";

import { ICategorySchema } from "./category";

export interface ICarSchema {
  _id?: Types.ObjectId;
  model: string;
  price: number;
  color: string;
  imageUrl: string;
  description: string;
  categoryId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  // populated fields
  category?: ICategorySchema;
}
