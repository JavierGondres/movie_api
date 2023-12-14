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

   async signUp({
      userName,
      userEmail,
      userPassword,
      userRole,
      userAccesToken,
   }: Users) {
      let message;
      try {
         console.log("Sign");

         const existUser = await this.userCollection.findOne({
            userEmail: userEmail,
         });

         if (existUser) {
            message = "Email in usage";
            return {
               error: true,
               message: message,
            };
         }

         const newUser: Partial<Document & { _id?: ObjectId }> = {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userAccesToken: userAccesToken,
            userRole: userRole ?? "User",
         };

         await this.userCollection.insertOne(newUser);

         message = "User created";
         return {
            error: false,
            message: message,
         };
      } catch (error) {
         console.log(error);
         message = "Something went wrong";
         return {
            error: true,
            message: message,
         };
      }
   }
}
