import CONSTANTS from "../constants/common";

const { MONGO_OBJECTID_PATTERN } = CONSTANTS.AJV_VALIDATOR;

export const getCategoryById = {
  type       : "object",
  required   : ["categoryId"],
  properties : {
    categoryId: {
      type         : "string",
      pattern      : MONGO_OBJECTID_PATTERN,
      nullable     : false,
      errorMessage : "'${0#}' field must be a 24-character hex string (MongoDB ObjectId), but got: ${0}",
    },
  },
  additionalProperties : false,
  errorMessage         : {
    required: {
      categoryId: "must have a string property 'categoryId'",
    },
  },
};
