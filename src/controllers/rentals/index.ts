import { Request, Response } from "express";
import { Roles } from "../../types/enum";
export class RentalController {
   rentalModel: any;

   constructor({ rentalModel }: any) {
      this.rentalModel = rentalModel;
   }

   rental = async (req: Request, res: Response) => {
      let { movieId, userName, quantity, rentalPrice, penalty } = req.body;
      const _id = req._id
      
      if(!_id){
         return res.status(500).json({
            error: true,
            message: "Error user id in rental"
         });
      }

      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      if (req.decodedUserRole !== Roles.ADMIN) penalty = undefined;

      try {
         result = await this.rentalModel.rental({
            _id,
            movieId,
            userName,
            quantity,
            rentalPrice,
            penalty,
         });

         if (result.error) return res.status(400).json(result);

         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
