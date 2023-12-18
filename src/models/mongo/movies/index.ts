import { Collection, Document, ObjectId, WithId } from "mongodb";
import { Movies } from "../types";

export class MovieModel {
   private movieCollection: Collection<Document>;
   private moviesLogsCollection: Collection<Document>;
   constructor(
      movieCollection: Collection<Document>,
      moviesLogsCollection: Collection<Document>
   ) {
      this.movieCollection = movieCollection;
      this.moviesLogsCollection = moviesLogsCollection;
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
      let message;
      const existMovie: WithId<Document> | null = await this.findMovieByTitle({
         title: title,
      });

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
            salePrice: salePrice,
            stock: stock,
            title: title,
            likes: 0,
            updatesLog: [],
         };

         await this.movieCollection.insertOne(newMovie);

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

   async updateMovie(
      _id: Pick<Movies, "_id">,
      movieObj: Partial<Movies & { _id?: ObjectId; likes?: number }>
   ) {
      let message;
      console.log(_id);

      try {
         const updatedMovie = await this.movieCollection.updateOne(
            { _id: new ObjectId(_id as unknown as ObjectId) },
            { $set: movieObj }
         );

         if (updatedMovie.modifiedCount === 0) {
            message = "That movie dosent exist or wasnt modified";
            return {
               error: true,
               message: message,
            };
         }

         try {
            const { title, rentalPrice, salePrice, _id } = movieObj;
            const movieLog: Partial<Movies & { movieId?: ObjectId }> = {
               movieId: new ObjectId(_id as unknown as ObjectId),
               ...(title && { title }),
               ...(rentalPrice && { rentalPrice }),
               ...(salePrice && { salePrice }),
               lastModifiedDate: movieObj.lastModifiedDate,
            };

            await this.moviesLogsCollection.insertOne(movieLog);
         } catch (error) {
            console.log(error);
            message = "Something went wrong creating movieLog";
            return {
               error: true,
               message: message,
            };
         }

         message = "Movie updated";

         return {
            error: false,
            message: message,
         };
      } catch (error) {
         console.log(error);
         message = "Something went wrong updating movie";
         return {
            error: true,
            message: message,
         };
      }
   }

   async findMovieByTitle({ title }: { title: string }) {
      const existMovie = await this.movieCollection.findOne({
         title: title,
      });

      return existMovie;
   }
}
