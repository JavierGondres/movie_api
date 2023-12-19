import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Users } from "../../models/mongo/types";
import { Collection, Document } from "mongodb";

declare module "express" {
   interface Request {
      decodedUserName?: any;
      decodedUserRole?: any;
      isValid?: any;
      _id?: any;
   }
}

export class ValidateToken {
   private userSessionsCollection: Collection<Document>;
   constructor(userSessionsCollection: Collection<Document>) {
      this.userSessionsCollection = userSessionsCollection;
   }

   validateToken = async (req: Request, res: Response, next: () => void) => {
      const authorizationHeader = req.headers["authorization"];
      let result: any;

      if (!authorizationHeader) {
         console.log(authorizationHeader);
         return res.status(401).json({
            error: true,
            message: "Access token is missing",
         });
      }

      const token = authorizationHeader.split(" ")[1];

      try {
         let user: Users | null = (await this.userSessionsCollection.findOne({
            userAccesToken: token,
         })) as Users | null;

         if (!user) {
            console.log(token);
            result = {
               error: true,
               message: "Authorization denied",
            };

            return res.status(403).json(result);
         }

         result = jwt.verify(
            token || "",
            process.env.JWT || "",
            (err: any, decoded: any) => {
               if (err) {
                  console.log(err);
                  return res.status(403).json({ message: "Forbidden r37226" });
               }
               if (!user?.userName === decoded.userName) {
                  result = {
                     error: true,
                     message: "Invalid token",
                  };

                  return res.status(401).json(result);
               }
               console.log("JWT", decoded);
               req.decodedUserRole = decoded.userRole;
               req._id = user?._id;
               next();
            }
         );
      } catch (error) {
         console.log({ errorMessage: error });
         return res
            .status(500)
            .json({ message: "Something went wrong in authorization" });
      }
   };
}
