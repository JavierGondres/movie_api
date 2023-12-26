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
      penalty,
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
            penalty: penalty,
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
            const { title, rentalPrice, salePrice, lastModifiedDate } =
               movieObj;
            if (title || rentalPrice || salePrice) {
               const movieLog: Partial<Movies & { movieId?: ObjectId }> = {
                  movieId: new ObjectId(_id as unknown as ObjectId),
                  ...(title && { title }),
                  ...(rentalPrice && { rentalPrice }),
                  ...(salePrice && { salePrice }),
                  lastModifiedDate: lastModifiedDate || new Date(),
               };

               //debo separar la logica aqui y modularizar mas
               await this.moviesLogsCollection.insertOne(movieLog);
               const latestMovieLogs = await this.moviesLogsCollection
                  .find({ movieId: new ObjectId(_id as unknown as ObjectId) })
                  .sort({ lastModifiedDate: -1 })
                  .limit(5)
                  .toArray();

               console.log(latestMovieLogs);

               await this.movieCollection.updateOne(
                  { _id: new ObjectId(_id as unknown as ObjectId) },
                  { $set: { updatesLog: latestMovieLogs } }
               );
            }
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

   async getAll(
      filterByAvailability?: string,
      sortBy?: "title" | "popularity",
      title?: string,
      page?: number,
      perPage?: number,
      sortOrder?: "asc" | "desc",
      sortProps?: string,
      exclusions?: string
   ) {
      try {
         let query: Record<string, any> = {};
         let sort: Record<string, any> = {
            title: sortOrder === "desc" ? -1 : 1,
         };

         if (filterByAvailability === "available") {
            query.availability = true;
         } else if (filterByAvailability === "unavailable") {
            query.availability = false;
         }

         // Ordenar por título por defecto
         if (sortBy === "popularity") {
            sort = { likes: sortOrder === "desc" ? -1 : 1 }; // Ordenar por popularidad (likes)
         }

         if (sortProps) {
            sort = { [sortProps]: sortOrder === "desc" ? -1 : 1 }; // Ordenar por popularidad (likes)
         }

         if (title) {
            query.title = { $regex: title, $options: "i" };
         }

         if (!perPage) perPage = 10;
         if (!page) page = 1;

         const skip = (page - 1) * perPage;

         let formattedExclusions: Record<string, any> = {}; // Asegurar que formattedExclusions acepta índices de tipo cadena
         if (exclusions) {
            exclusions
               .trim()
               .split(",")
               .forEach((exclusion) => {
                  formattedExclusions[exclusion] = 0;
               });
         }
         console.log("Exclude:  ", formattedExclusions);
         console.log("Query", query);
         console.log("Sort", sort);

         // Obtener resultados
         const movies = await this.movieCollection
            .find(query)
            .project(formattedExclusions)
            .sort(sort)
            .skip(skip)
            .limit(perPage)
            .toArray();

         return movies;
      } catch (error) {
         console.log(error);
         return null;
      }
   }

   async validateMovieExistence(movieId: ObjectId): Promise<Movies | null> {
      try {
         const movie = (await this.movieCollection.findOne({
            _id: new ObjectId(movieId),
         })) as Movies | null;
         return movie;
      } catch (error) {
         console.log(error);
         return null;
      }
   }

   async validateStock(
      movie: Movies | null,
      quantity?: number
   ): Promise<string | null> {
      if (!movie) {
         return "Movie doesn't exist, purchase error";
      } else if (movie.stock < (quantity ?? 0)) {
         return "There's not enough items in stock";
      } else if (movie.stock === 0) {
         return "In stock is 0";
      }

      return null; // No hay error
   }

   async updateStock(
      movie: Movies | null,
      quantity?: number
   ): Promise<string | null> {
      if (!movie) {
         return "Movie is null";
      }

      try {
         const newStock: Partial<Movies> = {
            stock: movie.stock - (quantity ?? 0),
         };

         const result = await this.updateMovie(
            movie._id as unknown as Pick<Movies, "_id">,
            newStock
         );

         if (result.error) {
            return "Error updating stock";
         }

         return null; // No hay error
      } catch (error) {
         console.log(error);
         return "Error updating stock";
      }
   }

   async findMovieByTitle({ title }: { title: string }) {
      const existMovie = await this.movieCollection.findOne({
         title: title,
      });

      return existMovie;
   }

   async findMovie(obj: object) {
      const existMovie = await this.movieCollection.findOne(obj);

      return existMovie;
   }
   
   async likeMovie(_id: ObjectId) {
      let message;
      try {
         const like = await this.movieCollection.updateOne(
            { _id: new ObjectId(_id) },
            {
               $inc: { likes: 1 },
            }
         );

         console.log("model", _id);

         if (like.modifiedCount === 0) {
            message = "Couldnt update or not found";
            return {
               error: true,
               message: message,
            };
         }

         message = "Liked";
         return {
            error: false,
            message: message,
         };
      } catch (error) {
         console.log(error);
         message = "Error en likes";
         return {
            error: true,
            message: message,
         };
      }
   }
}
