import { Collection, Document } from "mongodb";
import { Users } from "../types";

export class UserModel {
   private userCollection: Collection<Document>;
   constructor(userCollection: Collection<Document>) {
      this.userCollection = userCollection;
   }

   async getAll() {
      try {
         const users = await this.userCollection.find({}).toArray();
         console.log(users);
         return users;
      } catch (error) {
         return null;
      }
   }

   async purchase({_id}:Users) {
      try {
         const users = await this.userCollection.find({}).toArray();
         console.log(users);
         return users;
      } catch (error) {
         return null;
      }
   }
}
