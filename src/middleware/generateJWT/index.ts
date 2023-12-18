import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Props } from "./types";
dotenv.config();


export const generateJWT = async ({ userName, userRole}: Props) => {
   try {
      console.log(userName, userRole)
      const payload = { userName, userRole };
      const userAccesToken = jwt.sign(payload, process.env.JWT || '');
      return { error: false, userAccesToken };
   } catch (error) {
      return { error: true };
   }
};
