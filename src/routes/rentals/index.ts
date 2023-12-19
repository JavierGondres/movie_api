import { Router } from "express";
import { ValidateToken } from "../../middleware/verifyJWT";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";
import { Roles } from "../../types/enum";
import { validateData } from "../../middleware/validateData";
import { rentalSchema } from "../../models/mongo/users/schema";
import { RentalController } from "../../controllers/rentals";

export const createRentalRouter = ({
   rentalModel,
   userSessionCollection,
}: Pick<Database, "rentalModel" | "userSessionCollection">) => {
   const rentalRouter = Router();
   const rentalController = new RentalController({ rentalModel });
   const validateToken = new ValidateToken(userSessionCollection as any);

   rentalRouter.post(
      "/",
      [
         validateData(rentalSchema),
         validateToken.validateToken,
         isAdmin([Roles.USER, Roles.ADMIN]),
      ],
      rentalController.rental
   );

   return rentalRouter;
};
