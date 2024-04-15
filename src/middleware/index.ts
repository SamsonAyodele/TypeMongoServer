import { Response, NextFunction } from "express";
import { Schema } from "yup";
import { ResponseCode } from "../interfaces/enums/code-enum";
import utility from "../utils";

export const validator = (schema: Schema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (error: any) {
        return utility.handleError(res, error.errors[0], ResponseCode.BAD_REQUEST);
      }
    };
  };
  