import { ValidationChain, body } from "express-validator";

export const movieSchema = [
   body("availability")
      .notEmpty()
      .withMessage("availability is required")
      .isBoolean()
      .withMessage("availability most be a boolean"),
   body("description")
      .notEmpty()
      .withMessage("description is required")
      .isString()
      .withMessage("invalid description"),
   body("imageURL")
      .isURL()
      .withMessage("invalid imageURL")
      .notEmpty()
      .withMessage("imageURL is required"),
   body("rentalPrice")
      .isNumeric()
      .withMessage("Invalid rentalPrice")
      .notEmpty()
      .withMessage("rentalPrice is required"),
   body("salePrice")
      .isNumeric()
      .withMessage("Invalid salePrice")
      .notEmpty()
      .withMessage("salePrice is required"),
   body("stock")
      .isNumeric()
      .withMessage("Invalid stock")
      .notEmpty()
      .withMessage("stock is required"),
   body("penalty")
      .isNumeric()
      .withMessage("Invalid penalty")
      .notEmpty()
      .withMessage("penalty is required"),
   body("title")
      .isAlphanumeric()
      .withMessage("Invalid title")
      .notEmpty()
      .withMessage("title is required"),
];

export const updateMovieSchema: ValidationChain[] = movieSchema.concat([]);
