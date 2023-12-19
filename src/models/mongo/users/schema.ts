import { body } from "express-validator";

export const purchaseSchema = [
   body("userName")
      .notEmpty()
      .withMessage("userName is required")
      .isString()
      .withMessage("User most be a string"),
   body("_id")
      .notEmpty()
      .withMessage("_id is required")
      .isMongoId()
      .withMessage("invalid _id"),
   body("movieId")
      .notEmpty()
      .withMessage("movieId is required")
      .isMongoId()
      .withMessage("invalid movieId"),
   body("quantity")
      .notEmpty()
      .withMessage("Required quantity")
      .isNumeric()
      .withMessage("Invalid quantity"),
   body("salePrice")
      .notEmpty()
      .withMessage("Required salePrice")
      .isNumeric()
      .withMessage("Invalid salePrice"),
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
