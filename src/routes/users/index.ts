import { Router } from "express";
import { UsersController } from "../../controllers/users";

export const createUserRouter = ({ userModel }: any) => {
   const usersRouter = Router();
   const usersController = new UsersController({ userModel });

   usersRouter.get("/", usersController.getAll);

   return usersRouter;
};
