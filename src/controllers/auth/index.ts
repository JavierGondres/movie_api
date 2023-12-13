import { Request, Response } from "express";
import { generateJWT } from "../../middleware/generateJWT";
import { Roles } from "../../types/enum";
export class AuthController {
   authModel: any;

   constructor({ authModel }: any) {
      this.authModel = authModel;
   }

   signUp = async (_req: Request, res: Response) => {
      const { userEmail, userName, userPassword, userRole } = _req.body;
      console.log({ userName, userEmail, userPassword, userRole });

      userRole ? Roles.USER : userRole;

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

         const result = await this.authModel.signUp({
            userName,
            userEmail,
            userPassword,
            userRole,
            userAccesToken,
         });

         if (!result) {
            return res
               .status(500)
               .json({ ErrorMessag: "Hubo un error en el servidor" });
         }

         console.log({userAccesToken: userAccesToken})
         return res.status(200).json(result);
      } catch (e) {
         console.log(e);
         return res.status(501).json({ erroMessage: "Somethin went wrong in our server, try again later" });
      }
   };
}
