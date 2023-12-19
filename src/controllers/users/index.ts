import { Request, Response } from "express";
import { Roles } from "../../types/enum";
export class UsersController {
   userModel: any;

   constructor({ userModel }: any) {
      this.userModel = userModel;
   }

   getAll = async (_req: Request, res: Response) => {
      try {
         const users = await this.userModel.getAll();
         if (!users) {
            console.log(users);
            return res
               .status(500)
               .json({ ErrorMessag: "Hubo un error en el servidor" });
         }

         return res.status(200).json(users);
      } catch (e) {
         console.log(e);
         return res.status(501).json({ MessageError: e });
      }
   };

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
         result = await this.userModel.purchase({
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

   rental = async (req: Request, res: Response) => {
      let { _id, movieId, userName, quantity, rentalPrice, penalty } = req.body;
      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      if (req.decodedUserRole !== Roles.ADMIN) penalty = undefined;

      try {
         result = await this.userModel.rental({
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
