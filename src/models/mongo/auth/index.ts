import { Collection, ObjectId, Document, WithId } from "mongodb";
import { Users } from "../types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

interface SignInPayload extends Users {
   newAccesToken: string;
}

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
            userAccesToken: userAccesToken,
            userRole: userRole ?? "User",
            isValid: true,
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

   async signIn({ userEmail, userPassword, newAccesToken }: SignInPayload) {
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
         console.log(newAccesToken)
         const tryToUpdateAccesToken = await this.userCollection.updateOne(
            {
               userAccesToken: user.userAccesToken,
            },
            {
               $set: {
                  userAccesToken: newAccesToken,
                  isValid: true,
               },
            }
         );

         if (!tryToUpdateAccesToken) {
            message = "Error updating accesToken, user dosent found";
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
         const tryToUpdateUser = await this.userCollection.updateOne(
            {
               userAccesToken: userAccesToken,
            },
            {
               $set: {
                  isValid: false,
               },
            }
         );

         if (tryToUpdateUser.modifiedCount === 0) {
            message = "User doesn't exist or wasn't modified";
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
