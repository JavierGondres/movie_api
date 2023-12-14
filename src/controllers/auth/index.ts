import { Request, Response } from "express";
import { generateJWT } from "../../middleware/generateJWT";
import { Roles } from "../../types/enum";
export class AuthController {
   authModel: any;

   constructor({ authModel }: any) {
      this.authModel = authModel;
   }

   signIn = async (req: Request, res: Response) => {
      const { userEmail, userPassword, userAccesToken } = req.body;
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
            userAccesToken,
         });

         if (result.error) return res.status(400).json(result);

         console.log(req.body);
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
         const { error, userAccesToken } = await generateJWT({
            userName,
            userRole,
         });

         if (error) {
            return res.status(500).json({
               error: true,
               message: "Couldn't create access token. Please try again later.",
            });
         }

         result = await this.authModel.signUp({
            userName,
            userEmail,
            userPassword,
            userRole: userRole || Roles.USER,
            userAccesToken,
         });

         if (result.error) return res.status(400).json(result);

         console.log({ userAccesToken: userAccesToken });
         return res.status(200).json(result.message);
      } catch (e) {
         console.log(e);
         return res.status(501).json(result);
      }
   };
}
