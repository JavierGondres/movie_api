import express, { json } from "express";
import { createUserRouter } from "./routes/users";
import { createAuthRouter } from "./routes/auth";
import { createMovieRouter } from "./routes/movies";

export const createApp = async ({
   userModel,
   authModel,
   movieModel,
   userCollection,
   db_movie,
}: any) => {
   const app = express();
   app.use(json());1
   app.disable("x-powered-by");

   app.use(
      "/users",
      createUserRouter({ userModel: userModel, userCollection: userCollection })
   );
   app.use(
      "/auth",
      createAuthRouter({ authModel: authModel, userCollection: userCollection })
   );
   app.use(
      "/movies",
      createMovieRouter({
         movieModel: movieModel,
         userCollection: userCollection,
      })
   );

   const PORT = process.env.PORT ?? 1234;
   app.listen(PORT, () => {
      console.log(`Server is listening on port http://localhost:${PORT}`);
   });
};
