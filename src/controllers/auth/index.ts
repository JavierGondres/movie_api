import { Request, Response } from "express";
import { Roles } from "../../types/enum";

export class AuthController {
   authModel: any;

   constructor({ authModel }: any) {
      this.authModel = authModel;
   }

   signIn = async (req: Request, res: Response) => {
      const { userEmail, userPassword} = req.body;
      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      try {

         result = await this.authModel.signIn({
            userEmail,
            userPassword,
         });

         if (result.error) return res.status(400).json(result);

         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };

   signUp = async (req: Request, res: Response) => {
      const { userEmail, userName, userPassword, userRole } = req.body;
      let result: {
         error: boolean;
         message: string;
      } = {
         error: false,
         message: "Something went wrong",
      };

      try {

         result = await this.authModel.signUp({
            userName,
            userEmail,
            userPassword,
            userRole: userRole || Roles.USER,
         });

         if (result.error) return res.status(400).json(result);

         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };

   signOut = async (req: Request, res: Response) => {
      const {_id , userAccesToken} = req.body;
      let result: {
         error: boolean;
         message: string;
      } = {
         error: true,
         message: "Something went wrong signout",
      };

      try {
         result = await this.authModel.signOut({_id, userAccesToken });
         if (result.error) return res.status(400).json(result);

         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
