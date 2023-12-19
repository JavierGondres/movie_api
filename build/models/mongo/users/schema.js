"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalSchema = exports.purchaseSchema = void 0;
const express_validator_1 = require("express-validator");
exports.purchaseSchema = [
    (0, express_validator_1.body)("userName")
        .notEmpty()
        .withMessage("userName is required")
        .isString()
        .withMessage("User most be a string"),
    (0, express_validator_1.body)("movieId")
        .notEmpty()
        .withMessage("movieId is required")
        .isMongoId()
        .withMessage("invalid movieId"),
    (0, express_validator_1.body)("quantity")
        .notEmpty()
        .withMessage("Required quantity")
        .isNumeric()
        .withMessage("Invalid quantity"),
    (0, express_validator_1.body)("salePrice")
        .notEmpty()
        .withMessage("Required salePrice")
        .isNumeric()
        .withMessage("Invalid salePrice"),
];
exports.rentalSchema = [
    (0, express_validator_1.body)("userName")
        .notEmpty()
        .withMessage("userName is required")
        .isString()
        .withMessage("User most be a string"),
    (0, express_validator_1.body)("movieId")
        .notEmpty()
        .withMessage("movieId is required")
        .isMongoId()
        .withMessage("invalid movieId"),
    (0, express_validator_1.body)("quantity")
        .notEmpty()
        .withMessage("Required quantity")
        .isNumeric()
        .withMessage("Invalid quantity"),
    (0, express_validator_1.body)("rentalPrice")
        .notEmpty()
        .withMessage("Required rentalPrice")
        .isNumeric()
        .withMessage("Invalid rentalPrice"),
    (0, express_validator_1.body)("penalty")
        .isNumeric()
        .withMessage("Invalid quantity")
        .optional()
];
