import { Schema } from "mongoose";

import { ICarSchema } from "../../types/car";

const carSchema = new Schema<ICarSchema>(
  {
    model       : { type: String, required: true },
    price       : { type: Number, required: true },
    color       : { type: String, required: true },
    imageUrl    : { type: String, required: true },
    description : { type: String, required: true },
    categoryId  : { type: Schema.Types.ObjectId, ref: "categories", required: true },
  },
  {
    timestamps : true,
    autoIndex  : true,
    collection : "cars",
  });

carSchema.virtual("category", {
  ref          : "categories",
  localField   : "categoryId",
  foreignField : "_id",
});

export default carSchema;
