const CONSTANTS = {
  COMMON: {
    DEFAULT_OFFSET : 0,
    DEFAULT_LIMIT  : 50,
  },
  AJV_VALIDATOR: {
    MONGO_OBJECTID_PATTERN: "^[a-fA-F0-9]{24}$",
  },
  EXPRESS: {
    DEFAULT_PORT: 3000,
  },
} as const;

export default CONSTANTS;
