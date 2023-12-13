import { Router } from "express";
import { UsersController } from "../../controllers/users";
import { validateToken } from "../../middleware/verifyJWT";
import { isAdmin } from "../../middleware/isAdmin";

export const createUserRouter = ({ userModel }: any) => {
   const usersRouter = Router();
   const usersController = new UsersController({ userModel });

   usersRouter.get("/", [validateToken, isAdmin], usersController.getAll);

   return usersRouter;
};
