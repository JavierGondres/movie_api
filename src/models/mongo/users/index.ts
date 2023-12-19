import { Collection, Document, ObjectId } from "mongodb";
import { Movies, Purchases, Users } from "../types";

interface RentalPurchaseDetails extends Partial<Users & Purchases & Movies> {
   movieId: ObjectId;
   penalty: number;
}

export class UserModel {
   private userCollection: Collection<Document>;
   private movieCollection: Collection<Document>;
   private purchasesCollection: Collection<Document>;
   private rentalsCollection: Collection<Document>;
   private movieModel: any;

   constructor(
      userCollection: Collection<Document>,
      movieCollection: Collection<Document>,
      purchasesCollection: Collection<Document>,
      rentalsCollection: Collection<Document>,
      movieModel: any
   ) {
      this.userCollection = userCollection;
      this.movieCollection = movieCollection;
      this.purchasesCollection = purchasesCollection;
      this.rentalsCollection = rentalsCollection;
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
   
   private async validateMovieExistence(
      movieId: ObjectId
   ): Promise<Movies | null> {
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

   private async validateStock(
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

   private async insertPurchase(
      purchaseDetails: RentalPurchaseDetails
   ): Promise<string | null> {
      try {
         const { _id, userName, quantity, salePrice, movieId } =
            purchaseDetails;
         const purchaseObj = {
            userId: new ObjectId(_id),
            movieId: new ObjectId(movieId),
            userName: userName,
            quantity: quantity,
            purchasedDate: new Date(),
            salePrice: salePrice,
         };

         await this.purchasesCollection.insertOne(purchaseObj);
         return null; // No hay error
      } catch (error) {
         console.log(error);
         return "Error inserting purchase";
      }
   }
   private async insertRental(
      rentalDetails: RentalPurchaseDetails
   ): Promise<string | null> {
      try {
         const { _id, userName, quantity, movieId, penalty, rentalPrice } =
            rentalDetails;

         const dayToReturnMovie = new Date();
         dayToReturnMovie.setDate(dayToReturnMovie.getDate() + 20);

         const rentalObj = {
            userId: new ObjectId(_id),
            movieId: new ObjectId(movieId),
            userName: userName,
            quantity: quantity,
            rentalDate: new Date(),
            rentalPrice: rentalPrice,
            dayToReturnMovie: dayToReturnMovie,
            penalty: penalty ?? (rentalPrice ?? 100) / 2,
         };

         await this.rentalsCollection.insertOne(rentalObj);
         return null; // No hay error
      } catch (error) {
         console.log(error);
         return "Error inserting purchase";
      }
   }

   private async updateStock(
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

         const result = await this.movieModel.updateMovie(movie._id, newStock);

         if (result.error) {
            return "Error updating stock";
         }

         return null; // No hay error
      } catch (error) {
         console.log(error);
         return "Error updating stock";
      }
   }

   async purchase(
      purchaseDetails: RentalPurchaseDetails
   ): Promise<{ error: boolean; message: string }> {
      const { quantity, movieId } = purchaseDetails;
      console.log("id", movieId);
      const movie = await this.validateMovieExistence(movieId);

      const stockValidationMessage = await this.validateStock(movie, quantity);
      if (stockValidationMessage) {
         return { error: true, message: stockValidationMessage };
      }

      const purchaseInsertionMessage = await this.insertPurchase(
         purchaseDetails
      );

      if (purchaseInsertionMessage) {
         return { error: true, message: purchaseInsertionMessage };
      }

      const stockUpdateMessage = await this.updateStock(movie, quantity);

      if (stockUpdateMessage) {
         return { error: true, message: stockUpdateMessage };
      }

      return { error: false, message: "Purchase successful" };
   }

   async rental(
      rentalDetails: RentalPurchaseDetails
   ): Promise<{ error: boolean; message: string }> {
      const { quantity, movieId } = rentalDetails;
      console.log("id", movieId);
      const movie = await this.validateMovieExistence(movieId);

      const stockValidationMessage = await this.validateStock(movie, quantity);
      if (stockValidationMessage) {
         return { error: true, message: stockValidationMessage };
      }

      const rentalInsertionMessage = await this.insertRental(rentalDetails);

      if (rentalInsertionMessage) {
         return { error: true, message: rentalInsertionMessage };
      }

      const stockUpdateMessage = await this.updateStock(movie, quantity);

      if (stockUpdateMessage) {
         return { error: true, message: stockUpdateMessage };
      }

      return { error: false, message: "Rental successful" };
   }
}
