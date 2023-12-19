import { Collection, Document, ObjectId } from "mongodb";
import { Movies, RentalPurchaseDetails, Rentals } from "../types";

export class RentalModel {
   private rentalsCollection: Collection<Document>;
   private movieModel: any;

   constructor(rentalsCollection: Collection<Document>, movieModel: any) {
      this.rentalsCollection = rentalsCollection;
      this.movieModel = movieModel;
   }

   private async insertRental(
      rentalDetails: RentalPurchaseDetails,
      movie: Movies | null
   ): Promise<string | null> {
      try {
         const { _id, quantity, movieId } = rentalDetails;

         const dayToReturnMovie = new Date();
         dayToReturnMovie.setDate(dayToReturnMovie.getDate() + 20);

         const rentalObj: Partial<Rentals> = {
            userId: new ObjectId(_id),
            movieId: new ObjectId(movieId),
            quantity: quantity,
            rentalDate: new Date(),
            rentalPrice: movie?.rentalPrice,
            dayToReturnMovie: dayToReturnMovie,
            penalty: movie?.penalty,
            totalAmount: (movie?.rentalPrice ?? 0) * (quantity ?? 0),
         };

         await this.rentalsCollection.insertOne(rentalObj);
         return null; // No hay error
      } catch (error) {
         console.log(error);
         return "Error inserting purchase";
      }
   }

   async rental(
      rentalDetails: RentalPurchaseDetails
   ): Promise<{ error: boolean; message: string }> {
      const { quantity, movieId } = rentalDetails;
      console.log("id", movieId);
      const movie = await this.movieModel.validateMovieExistence(movieId);

      const stockValidationMessage = await this.movieModel.validateStock(
         movie,
         quantity
      );
      if (stockValidationMessage) {
         return { error: true, message: stockValidationMessage };
      }

      const rentalInsertionMessage = await this.insertRental(
         rentalDetails,
         movie
      );

      if (rentalInsertionMessage) {
         return { error: true, message: rentalInsertionMessage };
      }

      const stockUpdateMessage = await this.movieModel.updateStock(
         movie,
         quantity
      );

      if (stockUpdateMessage) {
         return { error: true, message: stockUpdateMessage };
      }

      return { error: false, message: "Rental successful" };
   }
}
