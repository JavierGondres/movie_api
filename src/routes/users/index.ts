import { Router } from "express";
import { UsersController } from "../../controllers/users";

import { ValidateToken } from "../../middleware/verifyJWT";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";

export const createUserRouter = ({ userModel, userCollection }: Pick<Database, 'userModel' | 'userCollection'>) => {
   const usersRouter = Router();
   const usersController = new UsersController({ userModel });

   const validateToken = new ValidateToken(userCollection as any);


   /*
   Para que se pueda pasar una metodo de una clase en un middleWare, el metodo
   se debe convertir a funcion flecha o usar bind, por ejemplo instanciaDeMiClase.miMetodo.bind(instanciaDeMiClase)
   y asi no se pierde el contexto "this"
   */
   usersRouter.get("/", [validateToken.validateToken, isAdmin], usersController.getAll);

   return usersRouter;
};


