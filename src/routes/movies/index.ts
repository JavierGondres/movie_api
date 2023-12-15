import { Router } from "express";
import { validateData } from "../../middleware/validateData";
import { ValidateToken } from "../../middleware/verifyJWT";
import { MovieController } from "../../controllers/movies";
import { movieSchema } from "../../models/mongo/movies/schema";
import { isAdmin } from "../../middleware/isAdmin";
import { Database } from "../../types/database";
import { CheckIsValid } from "../../middleware/checkIsValid";

export const createMovieRouter = ({
   movieModel,
   userCollection,
}: Pick<Database, "movieModel" | "userCollection">) => {
   const movieRouter = Router();
   const movieController = new MovieController({ movieModel });
   const validateToken = new ValidateToken(userCollection as any);
   const checkIsValid = new CheckIsValid()
   movieRouter.post(
      "/",
      [validateData(movieSchema), validateToken.validateToken, checkIsValid.checkIsValid, isAdmin],
      movieController.createMovie
   );
   //    movieRouter.post("/signUp", validateData(signUpSchema), movieController.signUp);

   return movieRouter;
};
