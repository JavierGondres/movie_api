import { Router } from "express";
import { AuthController } from "../../controllers/auth";
import { signInSchema, signUpSchema } from "../../models/mongo/auth/schema";
import { validateData } from "../../middleware/validateData";
// import { isAdmin } from "../../middleware/isAdmin";
import { ValidateToken } from "../../middleware/verifyJWT";

export const createAuthRouter = ({ authModel, db }: any) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });
   const validateToken = new ValidateToken(db)

   authRouter.get("/signIn", [validateData(signInSchema), validateToken.validateToken], authController.signIn);
   authRouter.post("/signUp", validateData(signUpSchema), authController.signUp);

   return authRouter;
};
