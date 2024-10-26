import { Connection, Model, Types } from "mongoose";

import CONSTANTS from "../constants/common";
import { NotFoundError } from "../services/errors/errorWrappers";
import logger from "../services/logger";
import { getDatabaseConnection } from "../services/mongoose";
import { ICategoryListData, ICategorySchema } from "../types/category";
import { IBaseRequest, IBaseListResponse, IBaseResponse } from "../types/common";

const { DEFAULT_LIMIT, DEFAULT_OFFSET } = CONSTANTS.COMMON;

class CategoryRepository {
  private categoryCollection: Model<ICategorySchema>;

  constructor(dbConnection: Connection) {
    this.categoryCollection = dbConnection.models.categories;
  }

  public async getCategoryList(
    data: IBaseRequest<null>,
  ): Promise<IBaseListResponse<ICategoryListData[]>> {
    const {
      requestId,
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = data;

    try {
      logger.debug(`[ID=${requestId}]: Inside ${this.getCategoryList.name} repository`);

      let total = 0;
      let categories: ICategoryListData[] = [];

      ({ data: categories, total } = await this.categoryCollection
        .aggregate([
          { $sort: { name: 1 } },
        ])
        .project({
          _id  : 1,
          name : 1,
        })
        .lookup({
          from         : "cars",
          localField   : "_id",
          foreignField : "categoryId",
          as           : "cars",
        })
        .project({
          _id  : 1,
          name : 1,
          cars : {
            _id        : 1,
            model      : 1,
            categoryId : 1,
          },
        })
        .facet({
          data: [
            { $skip: offset },
            { $limit: limit },
          ],
          total: [{ $count: "count" }],
        })
        .unwind("total")
        .project({
          data  : 1,
          total : "$total.count",
        })
        .then((result: { data: ICategoryListData[]; total: number }[]) =>
          result?.length ? result[0] : { data: [], total: 0 },
        ));
      logger.debug(`[ID=${requestId}]: Sending response from ${this.getCategoryList.name} repository`);

      return {
        data: {
          total,
          payload: categories,
        },
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while getting category list data in ${this.getCategoryList.name} repository`);
      throw error;
    }
  }

  public async getCategoryById(
    data: IBaseRequest<{ categoryId: string }>,
  ): Promise<IBaseResponse<ICategorySchema>> {
    const {
      requestId,
    } = data;

    try {
      logger.debug(`[ID=${requestId}]: Inside ${this.getCategoryById.name} repository`);

      const { categoryId } = data.payload;
      const category = await this.categoryCollection.findOne(
        { _id: new Types.ObjectId(categoryId) },
        { updatedAt: 0, createdAt: 0 },
      );

      if (!category) {
        throw new NotFoundError("Category with specified ID not found");
      }
      logger.debug(`[ID=${requestId}]: Sending response from ${this.getCategoryById.name} repository`);

      return {
        data: category,
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while getting category by ID data in ${this.getCategoryById.name} repository`);
      throw error;
    }
  }

  public async saveCategories(
    data: IBaseRequest<ICategorySchema[]>,
  ): Promise<IBaseResponse<ICategorySchema[]>> {
    const {
      requestId,
    } = data;
    try {
      logger.debug(`[ID=${requestId}]: Inside ${this.saveCategories.name} repository`);

      const categoriesToSave = data.payload;

      if (!categoriesToSave?.length) {
        logger.debug(`[ID=${requestId}]: There are no categories to save.`);

        return {
          data: [],
        };
      }

      const categories = await this.categoryCollection.insertMany(data.payload);

      logger.debug(`[ID=${requestId}]: Sending response from ${this.saveCategories.name} repository`);

      return {
        data: categories,
      };
    } catch (error) {
      logger.error(`[ID=${requestId}]: Error occured while saving categories in ${this.saveCategories.name} repository`);
      throw error;
    }
  }
}

export default new CategoryRepository(getDatabaseConnection() as Connection);
