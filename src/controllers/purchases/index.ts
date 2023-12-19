import { Request, Response } from "express";
export class PurchasesController {
   purchaseModel: any;

   constructor({ purchaseModel }: any) {
      this.purchaseModel = purchaseModel;
   }

   purchase = async (req: Request, res: Response) => {
      const { _id, movieId, userName, quantity, salePrice } = req.body;
      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      try {
         result = await this.purchaseModel.purchase({
            _id,
            movieId,
            userName,
            quantity,
            salePrice,
         });

         if (result.error) return res.status(400).json(result);

         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
