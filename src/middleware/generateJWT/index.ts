import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Props } from "./types";
dotenv.config();


export const generateJWT = async ({userRole}: Props) => {
   try {
      console.log(userRole)
      const payload = { userRole };
      const userAccesToken = jwt.sign(payload, process.env.JWT || '');
      return { error: false, userAccesToken };
   } catch (error) {
      return { error: true };
   }
};
