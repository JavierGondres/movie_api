import { Request, Response } from "express";
export class AuthController {
   authModel: any;

   constructor({ authModel }: any) {
      this.authModel = authModel;
   }

   signUp = async (_req: Request, res: Response) => {
      const { userEmail, userName, userPassword, userType } = _req.body;
      console.log({userName, userEmail, userPassword, userType})
      try {
         const tokenId = await this.authModel.signUp({
            userEmail,
            userName,
            userPassword,
            userType,
         });
         if (!tokenId) {
            console.log(tokenId);
            return res
               .status(500)
               .json({ ErrorMessag: "Hubo un error en el servidor" });
         }

         return res.status(200).json(tokenId);
      } catch (e) {
         console.log(e);
         return res.status(501).json({ MessageError: e });
      }
   };
}
