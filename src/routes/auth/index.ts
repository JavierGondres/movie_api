import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { signInSchema, signUpSchema } from "../../models/mongo/auth/schema";
import { validateData } from "../../middleware/validateData";
import { Database } from "../../types/database";
import { ValidateToken } from "../../middleware/verifyJWT";

export const createAuthRouter = ({
   authModel,
   userSessionCollection,
}: Pick<Database, "authModel" | "userSessionCollection">) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });
   const validateToken = new ValidateToken(userSessionCollection as any);

   authRouter.post(
      "/signIn",
      [validateData(signInSchema)],
      authController.signIn
   );
   authRouter.post(
      "/signUp",
      validateData(signUpSchema),
      authController.signUp
   );
   authRouter.post(
      "/signOut",
      validateToken.validateToken,
      authController.signOut
   );

   return authRouter;
};
