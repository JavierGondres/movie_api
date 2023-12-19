import { Router } from "express";
import { ValidateToken } from "../../middleware/verifyJWT";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";
import { Roles } from "../../types/enum";
import { validateData } from "../../middleware/validateData";
import { purchaseSchema } from "../../models/mongo/users/schema";
import { PurchasesController } from "../../controllers/purchases";

export const createPurchaseRouter = ({
   purchaseModel,
   userSessionCollection,
}: Pick<Database, "purchaseModel" | "userSessionCollection">) => {
   const purchaseRouter = Router();
   const purchaseController = new PurchasesController({ purchaseModel });
   const validateToken = new ValidateToken(userSessionCollection as any);

   purchaseRouter.post(
      "/",
      [
         validateData(purchaseSchema),
         validateToken.validateToken,
         isAdmin([Roles.USER, Roles.ADMIN]),
      ],
      purchaseController.purchase
   );

   return purchaseRouter;
};
