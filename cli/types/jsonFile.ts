import { ICarSchema } from "../../src/types/car";
import { ICategorySchema } from "../../src/types/category";

export interface IJsonFileData extends ICategorySchema {
  cars: ICarSchema[];
}
