import { Schema } from "mongoose";

import { ICategorySchema } from "../../types/category";

const categorySchema = new Schema<ICategorySchema>(
  {
    name        : { type: String, required: true },
    imageUrl    : { type: String, required: true },
    description : { type: String, required: true },
  },
  {
    timestamps : true,
    autoIndex  : true,
    collection : "categories",
  });

export default categorySchema;
