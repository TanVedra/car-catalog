import { model } from "mongoose";

import CategorySchema from "./schema";
import { ICategorySchema } from "../../types/category";

const categoryModel = model<ICategorySchema>(
  "categories",
  CategorySchema,
);

export default categoryModel;
