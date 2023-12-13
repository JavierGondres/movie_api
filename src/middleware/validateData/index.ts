import { Response, Request, NextFunction } from "express";
import { ContextRunner, validationResult } from "express-validator";

export const validateData = (validations: ContextRunner[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
         const result = await validation.run(req);
         if (result.array().length) break;
      }

      const errors = validationResult(req);
      if (errors.isEmpty()) {
         return next();
      }

      const totalError =  errors.array().map((e:any) => ({
         inputField: e.path,
         errorMessage: e.msg
      }))

      res.status(400).json({ errors: totalError });
   };
};
