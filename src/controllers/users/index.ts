import { Request, Response } from "express";
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

   likeMovie = async (req: Request, res: Response) => {
      const { _id } = req.body;
      console.log(_id)
      try {
         const result = await this.userModel.likeMovie({_id});
         if (result.error) {
            return res.status(400).json(result);
         }

         return res.status(200).json(result);
      } catch (e) {
         console.log(e);
         return res.status(501).json({ MessageError: "Error en likes" });
      }
   };
}
