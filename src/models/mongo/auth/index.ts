import { Collection, ObjectId, Document } from "mongodb";
import { Users } from "../types";
// import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();


export class AuthModel {

    private userCollection: Collection<Document>;
    constructor(userCollection: Collection<Document>) {
        this.userCollection = userCollection;
      }

   async signUp({ userName, userEmail, userPassword, userRole, userAccesToken }: Users) {
      try {
         console.log("Sign");
         console.log({tokenModel: userAccesToken})
         const newUser: Partial<Document & { _id?: ObjectId }> = {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userAccesToken: userAccesToken,
            userRole: userRole ?? "User",
        };

         const result = await this.userCollection.insertOne(newUser);

         return result.insertedId

      } catch (error) {
         console.log(error);
         return null;
      }
   }
}
