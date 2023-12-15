import { Collection, Document, ObjectId } from "mongodb";
import { Movies } from "../types";

export class MovieModel {
   private userCollection: Collection<Document>;
   constructor(userCollection: Collection<Document>) {
      this.userCollection = userCollection;
   }

   async createMovie({
      availability,
      description,
      imageURL,
      lastModifiedDate,
      rentalPrice,
      salePrice,
      stock,
      title,
   }: Movies) {
      let message
      try {
         const newMovie: Partial<Document & { _id?: ObjectId }> = {
            availability: availability,
            description: description,
            imageURL: imageURL,
            lastModifiedDate: lastModifiedDate,
            rentalPrice: rentalPrice,
            salePrice:salePrice,
            stock:stock,
            title:title,
         };

         await this.userCollection.insertOne(newMovie);

         message = "Movie created";
         return {
            error: false,
            message: message,
         };

      } catch (error) {
         console.log(error);
         message = "Something went wrong creating movie";
         return {
            error: true,
            message: message,
         };
      }
   }
}
