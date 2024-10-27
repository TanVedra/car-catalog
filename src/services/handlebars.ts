import Handlebars from "handlebars";
import { Types } from "mongoose";

class CustomHelpers {
  public static init (): void {
    Handlebars.registerHelper("isSelected", function (arg1, arg2, options) {
      arg1 = arg1 instanceof Types.ObjectId ? arg1.toString() : arg1;
      arg2 = arg2 instanceof Types.ObjectId ? arg2.toString() : arg2;

      if (arg1 === arg2) {
        return options.fn(this);
      }
    });
  }
}

export default CustomHelpers;
