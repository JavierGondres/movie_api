import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { signInSchema, signUpSchema } from "../../models/mongo/auth/schema";
import { validateData } from "../../middleware/validateData";
// import { isAdmin } from "../../middleware/isAdmin";
import { ValidateToken } from "../../middleware/verifyJWT";
import { Database } from "../../types/database";

export const createAuthRouter = ({ authModel, userCollection }: Pick<Database, 'authModel' | 'userCollection'>) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });
   const validateToken = new ValidateToken(userCollection as any)

   authRouter.get("/signIn", [validateData(signInSchema), validateToken.validateToken], authController.signIn);
   authRouter.post("/signUp", validateData(signUpSchema), authController.signUp);

   return authRouter;
};
