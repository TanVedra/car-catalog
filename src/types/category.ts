import { Types } from "mongoose";

import { ICarSchema } from "./car";

export interface ICategorySchema {
  _id?: Types.ObjectId;
  name: string;
  imageUrl: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryListData extends Required<Pick<ICategorySchema, "_id" | "name">> {
  cars: Required<Pick<ICarSchema, "_id" | "model">>[];
}
