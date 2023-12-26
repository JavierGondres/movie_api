import { Router } from "express";
import { validateData } from "../../middleware/validateData";
import { ValidateToken } from "../../middleware/verifyJWT";
import { MovieController } from "../../controllers/movies";
import {
   movieSchema,
   updateMovieSchema,
} from "../../models/mongo/movies/schema";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";
import { Roles } from "../../types/enum";
// import { CheckIsValid } from "../../middleware/checkIsValid";

export const createMovieRouter = ({
   movieModel,
   userSessionCollection,
}: Pick<Database, "movieModel" | "userSessionCollection">) => {
   const movieRouter = Router();
   const movieController = new MovieController({ movieModel });
   const validateToken = new ValidateToken(userSessionCollection as any);

   movieRouter.post(
      "/",
      [
         validateData(movieSchema),
         validateToken.validateToken,
         isAdmin([Roles.ADMIN]),
      ],
      movieController.createMovie
   );
   movieRouter.put(
      "/:id",
      validateData(updateMovieSchema),
      validateToken.validateToken,
      isAdmin([Roles.ADMIN]),
      movieController.updateMovie
   );

   movieRouter.get(
      "/",
      validateToken.validateToken,
      movieController.getAll
   );

   return movieRouter;
};
