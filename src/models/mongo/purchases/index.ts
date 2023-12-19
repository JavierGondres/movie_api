import { Collection, Document, ObjectId } from "mongodb";
import {RentalPurchaseDetails} from "../types";

export class PurchaseModel {
   private purchasesCollection: Collection<Document>;
   private movieModel: any;

   constructor(purchasesCollection: Collection<Document>, movieModel: any) {
      this.purchasesCollection = purchasesCollection;
      this.movieModel = movieModel;
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
         purchaseDetails
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
