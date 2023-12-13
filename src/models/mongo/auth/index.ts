import { MongoSingleton } from "../../../services/MongoSingleton";
import { DB, DBCollections } from "../../../types/enum";
import { Users } from "../types";
// import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();

const db = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.USERS);

export class AuthModel {
   static async signUp({ userName, userEmail, userPassword, userRole, userAccesToken }: Users) {
      try {
         console.log("Sign");
         console.log({tokenModel: userAccesToken})
         const newUser = {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userAccesToken: userAccesToken,
            userRole: userRole ?? "User",
         };

         const result = await db.insertOne(newUser);

         return result.insertedId

      } catch (error) {
         console.log(error);
         return null;
      }
   }
}
