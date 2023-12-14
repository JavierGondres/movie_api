import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { signInSchema, signUpSchema } from "../../models/mongo/auth/schema";
import { validateData } from "../../middleware/validateData";

export const createAuthRouter = ({ authModel }: any) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });

   authRouter.post("/signIn", validateData(signInSchema), authController.signIn);
   authRouter.post("/signUp", validateData(signUpSchema), authController.signUp);

   return authRouter;
};
