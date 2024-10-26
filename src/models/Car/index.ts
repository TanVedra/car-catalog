import { model } from "mongoose";

import CarSchema from "./schema";
import { ICarSchema } from "../../types/car";

const carModel = model<ICarSchema>(
  "cars",
  CarSchema,
);

export default carModel;
