"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.movieSchema = void 0;
const express_validator_1 = require("express-validator");
exports.movieSchema = [
    (0, express_validator_1.body)("availability")
        .notEmpty()
        .withMessage("availability is required")
        .isBoolean()
        .withMessage("availability most be a boolean"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("invalid description"),
    (0, express_validator_1.body)("imageURL")
        .isURL()
        .withMessage("invalid imageURL")
        .notEmpty()
        .withMessage("imageURL is required"),
    (0, express_validator_1.body)("rentalPrice")
        .isNumeric()
        .withMessage("Invalid rentalPrice")
        .notEmpty()
        .withMessage("rentalPrice is required"),
    (0, express_validator_1.body)("salePrice")
        .isNumeric()
        .withMessage("Invalid salePrice")
        .notEmpty()
        .withMessage("salePrice is required"),
    (0, express_validator_1.body)("stock")
        .isNumeric()
        .withMessage("Invalid stock")
        .notEmpty()
        .withMessage("stock is required"),
    (0, express_validator_1.body)("penalty")
        .isNumeric()
        .withMessage("Invalid penalty")
        .notEmpty()
        .withMessage("penalty is required"),
    (0, express_validator_1.body)("title")
        .isAlphanumeric()
        .withMessage("Invalid title")
        .notEmpty()
        .withMessage("title is required"),
];
exports.updateMovieSchema = exports.movieSchema.concat([]);
