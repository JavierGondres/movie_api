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

export const rentalSchema = [
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
   body("rentalPrice")
      .notEmpty()
      .withMessage("Required rentalPrice")
      .isNumeric()
      .withMessage("Invalid rentalPrice"),
   body("penalty")
      .isNumeric()
      .withMessage("Invalid quantity")
      .optional()
];
