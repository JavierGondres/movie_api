import { Router } from "express";
import { UsersController } from "../../controllers/users";

import { ValidateToken } from "../../middleware/verifyJWT";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";
import { Roles } from "../../types/enum";
import { validateData } from "../../middleware/validateData";
import { purchaseSchema, rentalSchema } from "../../models/mongo/users/schema";

export const createUserRouter = ({
   userModel,
   userSessionCollection,
}: Pick<Database, "userModel" | "userSessionCollection">) => {
   const usersRouter = Router();
   const usersController = new UsersController({ userModel });
   const validateToken = new ValidateToken(userSessionCollection as any);

   /*
   Para que se pueda pasar una metodo de una clase en un middleWare, el metodo
   se debe convertir a funcion flecha o usar bind, por ejemplo instanciaDeMiClase.miMetodo.bind(instanciaDeMiClase)
   y asi no se pierde el contexto "this"
   */
   usersRouter.get(
      "/",
      [validateToken.validateToken, isAdmin([Roles.ADMIN])],
      usersController.getAll
   );
   usersRouter.post(
      "/purchase",
      [
         validateData(purchaseSchema),
         validateToken.validateToken,
         isAdmin([Roles.USER, Roles.ADMIN]),
      ],
      usersController.purchase
   );
   usersRouter.post(
      "/rental",
      [
         validateData(rentalSchema),
         validateToken.validateToken,
         isAdmin([Roles.USER, Roles.ADMIN]),
      ],
      usersController.rental
   );

   return usersRouter;
};
