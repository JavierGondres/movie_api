import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { signInSchema, signUpSchema } from "../../models/mongo/auth/schema";
import { validateData } from "../../middleware/validateData";
// import { isAdmin } from "../../middleware/isAdmin";
// import { ValidateToken } from "../../middleware/verifyJWT";
import { Database } from "../../types/database";
import { ValidateToken } from "../../middleware/verifyJWT";
// import { CheckIsValid } from "../../middleware/checkIsValid";

export const createAuthRouter = ({
   authModel,
   userSessionCollection,
}: Pick<
   Database,
   "authModel" | "userCollection" | "userSessionCollection"
>) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });
   const validateToken = new ValidateToken(userSessionCollection as any);
   // const checkIsValid = new CheckIsValid()

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
