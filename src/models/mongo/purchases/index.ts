import { Collection, Document, ObjectId } from "mongodb";
import {Movies, Purchases, RentalPurchaseDetails} from "../types";

export class PurchaseModel {
   private purchasesCollection: Collection<Document>;
   private movieModel: any;

   constructor(purchasesCollection: Collection<Document>, movieModel: any) {
      this.purchasesCollection = purchasesCollection;
      this.movieModel = movieModel;
   }

   private async insertPurchase(
      purchaseDetails: RentalPurchaseDetails,
      movie: Movies | null
   ): Promise<string | null> {
      try {
         const { _id, quantity, movieId } =
            purchaseDetails;
         const purchaseObj: Partial<Purchases> = {
            userId: new ObjectId(_id),
            movieId: new ObjectId(movieId),
            quantity: quantity,
            purchasedDate: new Date(),
            salePrice: movie?.salePrice,
            totalAmount: (movie?.salePrice ?? 0) * (quantity ?? 0),
         };

         await this.purchasesCollection.insertOne(purchaseObj);
         return null; // No hay error
      } catch (error) {
         console.log(error);
         return "Error inserting purchase";
      }
   }

   async purchase(
      purchaseDetails: RentalPurchaseDetails
   ): Promise<{ error: boolean; message: string }> {
      const { quantity, movieId } = purchaseDetails;
      console.log("id", movieId);
      const movie = await this.movieModel.validateMovieExistence(movieId);

      const stockValidationMessage = await this.movieModel.validateStock(
         movie,
         quantity
      );
      if (stockValidationMessage) {
         return { error: true, message: stockValidationMessage };
      }

      const purchaseInsertionMessage = await this.insertPurchase(
         purchaseDetails,
         movie
      );

      if (purchaseInsertionMessage) {
         return { error: true, message: purchaseInsertionMessage };
      }

      const stockUpdateMessage = await this.movieModel.updateStock(
         movie,
         quantity
      );

      if (stockUpdateMessage) {
         return { error: true, message: stockUpdateMessage };
      }

      return { error: false, message: "Purchase successful" };
   }
}
