import { Router } from "express";
import { AuthController } from "../../controllers/auth";

export const createAuthRouter = ({authModel }: any) => {
   const authRouter = Router();
   const authController = new AuthController({ authModel });

   authRouter.post("/", authController.signUp);

   return authRouter;
};
