import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { signInSchema, signOutSchema, signUpSchema } from "../../models/mongo/auth/schema";
import { validateData } from "../../middleware/validateData";
// import { isAdmin } from "../../middleware/isAdmin";
import { ValidateToken } from "../../middleware/verifyJWT";
import { Database } from "../../types/database";
import { CheckIsValid } from "../../middleware/checkIsValid";

export const createAuthRouter = ({ authModel, userCollection }: Pick<Database, 'authModel' | 'userCollection'>) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });
   const validateToken = new ValidateToken(userCollection as any)
   const checkIsValid = new CheckIsValid()

   authRouter.post("/signIn", [validateData(signInSchema), validateToken.validateToken, checkIsValid.checkIsValid], authController.signIn);
   authRouter.post("/signUp", validateData(signUpSchema), authController.signUp);
   authRouter.post("/signOut", validateData(signOutSchema), authController.signOut);

   return authRouter;
};
