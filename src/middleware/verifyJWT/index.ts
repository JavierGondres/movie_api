import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { MongoSingleton } from "../../services/MongoSingleton";
import { DB, DBCollections } from "../../types/enum";
import { Users } from "../../models/mongo/types";

declare module "express" {
   interface Request {
      decodedUserName?: any;
      decodedUserRole?: any;
   }
}

const users = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.USERS);

export const validateToken = async (
   req: Request,
   res: Response,
   next: () => void
) => {
   const auhorizationHeader = req.headers.authorization;
   let result: any;

   if (!auhorizationHeader) {
      return res.status(401).json({
         error: true,
         message: "Access token is missing",
      });
   }

   const token = auhorizationHeader.split(" ")[1];

   try {
      let user: Users | null = (await users.findOne({
         userAccesToken: token,
      })) as Users | null;

      if (!user) {
         result = {
            error: true,
            message: "Authorization error",
         };

         return res.status(403).json(result);
      }

      result = jwt.verify(
         token || "",
         process.env.JWT || "",
         (err: any, decoded: any) => {
            if (err) {
               return res.status(403).json({ message: "Forbidden r37226" });
            }
            if (!user?.userName === decoded.userName) {
               result = {
                  error: true,
                  message: "Invalid token",
               };

               return res.status(401).json(result);
            }
            req.decodedUserName = decoded.userName;
            req.decodedUserRole = decoded.userRole;
            next();
         }
      );
   } catch (error) {
      console.log({ errorMessage: error });
      return res.status(500).json({ message: "Something went wrong" });
   }
};
