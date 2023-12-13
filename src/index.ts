import express, { json } from "express";
import { createUserRouter } from "./routes/users";
import { createAuthRouter } from "./routes/auth";

export const createApp = async ({ userModel, authModel }: any) => {
   const app = express();
   app.use(json());
   app.disable("x-powered-by");

   
   app.use("/users", createUserRouter({ userModel: userModel }));
   app.use("/auth", createAuthRouter({ authModel: authModel }));

   
   
   const PORT = process.env.PORT ?? 1234;
   app.listen(PORT, () => {
      console.log(`Server is listening on port http://localhost:${PORT}`);
   });
};
