import { Collection, Document } from "mongodb";
import { Movies } from "../types";

export class UserModel {
   private userCollection: Collection<Document>;
   private movieModel: any;
   constructor(userCollection: Collection<Document>, movieModel: any) {
      this.userCollection = userCollection;
      this.movieModel = movieModel;
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

   async likeMovie({ _id }: Partial<Movies>) {
      let message = "Something went wrong in likes";
      try {
         const result = await this.movieModel.likeMovie(_id);
         return result;
      } catch (error) {
         console.log(error);
         return {
            error: true,
            message: message,
         };
      }
   }
}
