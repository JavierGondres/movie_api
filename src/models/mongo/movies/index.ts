import { Collection, Document, ObjectId, WithId } from "mongodb";
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
      const existMovie: WithId<Document> | null = await this.findMovieByTitle({title: title});

      if (existMovie) {
         message = "That movie already exist";
         return {
            error: true,
            message: message,
         };
      }

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
            likes: 0,
            updatesLog: []
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

   async findMovieByTitle({ title }: { title: string }) {
      const existMovie = await this.userCollection.findOne({
         title: title,
      });

      return existMovie;
   }
}
