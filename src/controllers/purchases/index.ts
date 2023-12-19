import { Request, Response } from "express";
export class PurchasesController {
   purchaseModel: any;

   constructor({ purchaseModel }: any) {
      this.purchaseModel = purchaseModel;
   }

   purchase = async (req: Request, res: Response) => {
      const { movieId, quantity } = req.body;

      const _id = req._id;

      if (!_id) {
         return res.status(500).json({
            error: true,
            message: "Error user id in rental",
         });
      }

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
            quantity,
         });

         if (result.error) return res.status(400).json(result);

         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
