import { Request, Response } from "express";

export class CheckIsValid {
   checkIsValid = async (req: Request, res: Response, next: () => void) => {
      let message;
      if (!req.isValid) {
         message = {
            error: true,
            message: "isValid false",
         };
         return res.status(403).json(message);
      }

      next();
   };
}
