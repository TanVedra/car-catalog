import CONSTANTS from "../constants/common";

const { MONGO_OBJECTID_PATTERN } = CONSTANTS.AJV_VALIDATOR;

export const getCarById = {
  type       : "object",
  required   : ["categoryId", "carId"],
  properties : {
    categoryId: {
      type         : "string",
      pattern      : MONGO_OBJECTID_PATTERN,
      nullable     : false,
      errorMessage : "'${0#}' field must be a 24-character hex string (MongoDB ObjectId), but got: ${0}",
    },
    carId: {
      type         : "string",
      pattern      : MONGO_OBJECTID_PATTERN,
      nullable     : false,
      errorMessage : "'${0#}' field must be a 24-character hex string (MongoDB ObjectId), but got ${0}",
    },
  },
  additionalProperties : false,
  errorMessage         : {
    required: {
      carId      : "must have a string property 'carId'",
      categoryId : "must have a string property 'categoryId'",
    },
  },
};
