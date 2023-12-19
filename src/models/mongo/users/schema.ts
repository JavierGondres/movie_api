import { body } from "express-validator";

export const purchaseSchema = [
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
];

export const rentalSchema = [
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
   body("penalty")
      .isNumeric()
      .withMessage("Invalid quantity")
      .optional()
];
