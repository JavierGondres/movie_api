import { Collection, ObjectId, Document, WithId } from "mongodb";
import { Users } from "../types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateJWT } from "../../../middleware/generateJWT";
dotenv.config();

export class AuthModel {
   private userCollection: Collection<Document>;
   private userSessionsCollection: Collection<Document>;
   constructor(
      userCollection: Collection<Document>,
      userSessionsCollection: Collection<Document>
   ) {
      this.userCollection = userCollection;
      this.userSessionsCollection = userSessionsCollection;
   }

   async signUp({ userName, userEmail, userPassword, userRole }: Users) {
      let message;
      const passwordHash = await bcrypt.hash(userPassword.toString(), 8);
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
            userPassword: passwordHash,
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

   async signIn({ userEmail, userPassword }: Users) {
      let message;
      const existUser: WithId<Document> | null = await this.findUser({
         userEmail: userEmail,
      });

      if (!existUser) {
         message = "User doesnt exist";
         return {
            error: true,
            message: message,
         };
      }

      try {
         const user: Users = existUser as unknown as Users;
         const isValidPassowrd = await bcrypt.compare(
            userPassword.toString(),
            user.userPassword.toString()
         );

         if (!isValidPassowrd) {
            message = "Password or email is incorrect";
            return {
               error: true,
               message: message,
            };
         }

         const { error, userAccesToken } = await generateJWT({
            userRole: user.userRole,
         });

         if (error) {
            message =
               "Couldn't create access token. Please try again later signIn.";
            return {
               error: true,
               message: message,
            };
         }

         try {
            const accesToken = {
               userId: user._id,
               userAccesToken: userAccesToken,
               // isValid: true,
            };

            await this.userSessionsCollection.insertOne(accesToken);

            // await this.userSessionsCollection.updateOne(
            //    { _id: new ObjectId(user._id) },
            //    { $push: { userSessions: [accesToken] } }
            // );

         } catch (error) {
            console.log(error);
            message = `Somethin went wron trying to login and create token`;
            return {
               error: true,
               message: message,
            };
         }

         message = `Welcome ${user.userName}, you are logged in`;
         return {
            error: false,
            message: message,
         };
      } catch (error) {
         console.log(error);
         message = `Somethin went wron trying to login`;
         return {
            error: true,
            message: message,
         };
      }
   }

   async signOut({ userAccesToken }: Users) {
      let message;
      try {

         const deleteToken = await this.userSessionsCollection.deleteOne({
            userAccesToken: userAccesToken,
         });

         if (deleteToken.deletedCount === 0) {
            message = "User doesn't exist or wasn't deleted";
            return {
               error: true,
               message: message,
            };
         }

         message = "Logout";
         return {
            error: false,
            message: message,
         };
      } catch (error) {
         console.log(error);
         message = "Problems with logging out";
         return {
            error: true,
            message: message,
         };
      }
   }

   async findUser(obj: object) {
      const existUser = await this.userCollection.findOne(obj);

      return existUser;
   }
}
