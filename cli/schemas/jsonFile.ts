const car = {
  type       : "object",
  required   : ["model", "description", "imageUrl", "price", "color"],
  properties : {
    model: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/model}] ${0#} must be not empty string, but got: ${0}",
    },
    description: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/model}] ${0#} must be not empty string, but got: ${0}",
    },
    imageUrl: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/model}] ${0#} must be not empty string, but got: ${0}",
    },
    price: {
      type         : "number",
      nullable     : false,
      minimum      : 0,
      errorMessage : "[${1/model}] ${0#} must be a positive number, but got: ${0}",
    },
    color: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/model}] ${0#} must be not empty string, but got: ${0}",
    },
  },
  additionalProperties : false,
  errorMessage         : {
    additionalProperties : "Check your data. Additional properties are not allowed in car object",
    required             : {
      price       : "must have a number property 'price'",
      model       : "must have a string property 'model'",
      color       : "must have a string property 'color'",
      imageUrl    : "must have a string property 'imageUrl'",
      description : "must have a string property 'description'",
    },
  },
};

const category = {
  type       : "object",
  required   : ["name", "description", "imageUrl", "cars"],
  properties : {
    name: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/name}] ${0#} must be not empty string, but got: ${0}",
    },
    description: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/name}] ${0#} must be not empty string, but got: ${0}",
    },
    imageUrl: {
      type         : "string",
      minLength    : 1,
      nullable     : false,
      transform    : ["trim"],
      errorMessage : "[${1/name}] ${0#} must be not empty string, but got: ${0}",
    },
    cars: {
      type  : "array",
      items : car,
    },
  },
  additionalProperties : false,
  errorMessage         : {
    additionalProperties : "Check your data. Additional properties are not allowed in category object",
    required             : {
      cars        : "must have an array property 'cars'",
      name        : "must have a string property 'name'",
      imageUrl    : "must have a string property 'imageUrl'",
      description : "must have a string property 'description'",
    },
  },
};

export const jsonFileValidationSchema = {
  type         : "array",
  minItems     : 1,
  items        : category,
  errorMessage : "The data must be not empty array of objects of the appropriate structure.",
};
