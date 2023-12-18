import { Roles } from "../../../types/enum";
import { body } from "express-validator";

export const signUpSchema = [
   body("userName")
      .notEmpty()
      .withMessage("userName is required")
      .isString()
      .withMessage("User most be a string"),
   body("userEmail")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
   body("userPassword")
      .isLength({ min: 6 })
      .withMessage("password too short")
      .notEmpty()
      .withMessage("password is required"),
   body("userRole")
      .toLowerCase()
      .isIn(Object.values(Roles).map((e) => e.toLocaleLowerCase()))
      .withMessage("Invalid role")
      .optional(),
];

export const signInSchema = [
   body("userEmail")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
   body("userPassword")
      .isLength({ min: 6 })
      .withMessage("password too short")
      .notEmpty()
      .withMessage("password is required"),
];

export const signOutSchema = [
   body("_id")
      .isMongoId()
      .withMessage("Invalid _id")
      .notEmpty()
      .withMessage("_id required"),
   body("userAccesToken")
      .isString()
      .withMessage("Invalid userAccesToken")
      .notEmpty()
      .withMessage("userAccesToken required"),
];
