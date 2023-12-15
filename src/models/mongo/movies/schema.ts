import { body, check } from "express-validator";

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
   check("lastModifiedDate")
      .trim()
      .custom((value) => {
         const parsedDate = new Date(value);

         if (isNaN(parsedDate as unknown as number)) {
            throw new Error("Must be a valid date");
         }

         if (parsedDate > new Date()) {
            throw new Error("Must be a valid date");
         }

         return true;
      }),
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
   body("title")
      .isAlphanumeric()
      .withMessage("Invalid title")
      .notEmpty()
      .withMessage("title is required"),
];
