import { Router } from "express";
import { validateData } from "../../middleware/validateData";
import { ValidateToken } from "../../middleware/verifyJWT";
import { MovieController } from "../../controllers/movies";
import { movieSchema } from "../../models/mongo/movies/schema";
import { isAdmin } from "../../middleware/isAdmin";

export const createMovieRouter = ({ movieModel, userCollection }: any) => {
   const movieRouter = Router();
   const movieController = new MovieController({ movieModel });
   const validateToken = new ValidateToken(userCollection)

   movieRouter.post("/", [validateData(movieSchema), validateToken.validateToken, isAdmin], movieController.createMovie);
//    movieRouter.post("/signUp", validateData(signUpSchema), movieController.signUp);

   return movieRouter;
};
