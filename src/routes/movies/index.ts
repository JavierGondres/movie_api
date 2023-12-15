import { Router } from "express";
import { validateData } from "../../middleware/validateData";
import { ValidateToken } from "../../middleware/verifyJWT";
import { MovieController } from "../../controllers/movies";
import { movieSchema } from "../../models/mongo/movies/schema";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";

export const createMovieRouter = ({
   movieModel,
   userCollection,
}: Pick<Database, "movieModel" | "userCollection">) => {
   const movieRouter = Router();
   const movieController = new MovieController({ movieModel });
   const validateToken = new ValidateToken(userCollection as any);

   movieRouter.post(
      "/",
      [validateData(movieSchema), validateToken.validateToken, isAdmin],
      movieController.createMovie
   );
   //    movieRouter.post("/signUp", validateData(signUpSchema), movieController.signUp);

   return movieRouter;
};
