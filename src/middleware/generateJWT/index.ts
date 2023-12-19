import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "../../models/mongo/types";
dotenv.config();


export const generateJWT = async ({userRole, _id}: Pick<Users, 'userRole' | '_id'>) => {
   try {
      console.log("GeneratingJWT ",userRole, _id)
      const payload = { userRole, _id };
      const userAccesToken = jwt.sign(payload, process.env.JWT || '');
      return { error: false, userAccesToken };
   } catch (error) {
      return { error: true };
   }
};
