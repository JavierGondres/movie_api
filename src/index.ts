import express, { json } from "express";
import { createUserRouter } from "./routes/users";
import { createAuthRouter } from "./routes/auth";
import { createMovieRouter } from "./routes/movies";
import { Database } from "./types/database";
import { createRentalRouter } from "./routes/rentals";
import { createPurchaseRouter } from "./routes/purchases";
// import cors from "cors";
export const createApp = async ({
   userModel,
   authModel,
   movieModel,
   rentalModel,
   purchaseModel,
   userSessionCollection
}: Database) => {
   const app = express();
   app.use(json());
   app.disable("x-powered-by");

   app.use(
      "/users",
      createUserRouter({ userModel: userModel, userSessionCollection: userSessionCollection })
   );
   app.use(
      "/auth",
      createAuthRouter({ authModel: authModel, userSessionCollection: userSessionCollection })
   );
   app.use(
      "/movies",
      createMovieRouter({
         movieModel: movieModel,
         userSessionCollection: userSessionCollection
      })
   );
   app.use(
      "/rentals",
      createRentalRouter({
         rentalModel: rentalModel,
         userSessionCollection: userSessionCollection
      })
   );
   app.use(
      "/purchases",
      createPurchaseRouter({
         purchaseModel: purchaseModel,
         userSessionCollection: userSessionCollection
      })
   );

   const PORT = process.env.PORT ?? 1234;
   app.listen(PORT, () => {
      console.log(`Server is listening on port http://localhost:${PORT}`);
   });
};
