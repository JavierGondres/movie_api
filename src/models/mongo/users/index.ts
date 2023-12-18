import { Collection, Document, ObjectId } from "mongodb";
import { Movies, Purchases, Users } from "../types";

export class UserModel {
   private userCollection: Collection<Document>;
   private movieCollection: Collection<Document>;
   private purchasesCollection: Collection<Document>;
   private movieModel: any;

   constructor(
      userCollection: Collection<Document>,
      movieCollection: Collection<Document>,
      purchasesCollection: Collection<Document>,
      movieModel: any
   ) {
      this.userCollection = userCollection;
      this.movieCollection = movieCollection;
      this.purchasesCollection = purchasesCollection;
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

   async purchase({
      _id,
      movieId,
      userName,
      quantity,
      salePrice,
   }: Partial<Users & Purchases & Movies & { movieId: ObjectId }>) {
      let message;
      let existMovie: Movies;

      try {
         existMovie = (await this.movieCollection.findOne({
            _id: new ObjectId(movieId),
         })) as Movies;

         if (!existMovie) {
            message = "Movie dosent exist, purchase error";
            return {
               error: true,
               message: message,
            };
         } else if (existMovie.stock < (quantity ?? 0)) {
            message = "Theres not enough items in stock";
            return {
               error: true,
               message: message,
            };
         } else if (existMovie.stock === 0) {
            message = "In stock 0";
            return {
               error: true,
               message: message,
            };
         }
      } catch (error) {
         console.log(error);
         message = "Error trying to look for a movie";
         return {
            error: true,
            message: message,
         };
      }

      try {
         const purchaseObj = {
            userId: _id,
            userName: userName,
            quantity: quantity,
            purchasedDate: new Date(),
            salePrice: salePrice,
         };

         console.log("movieID", movieId);

         await this.purchasesCollection.insertOne(purchaseObj);

         try {
            const newStock: Partial<Movies> = {
               stock: existMovie.stock - (quantity ?? 0),
            };

            const result = await this.movieModel.updateMovie(movieId, newStock);

            if (result.error) {
               return result;
            }
         } catch (e) {
            console.log(e);
            message = "Error trying to reduce stock";
            return {
               error: true,
               message: message,
            };
         }
         message = "Purchased";
         return {
            error: false,
            message: message,
         };
      } catch (error) {
         console.log(error);
         message = "Something went wrong buying";
         return {
            error: true,
            message: message,
         };
      }
   }
}
