"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.purchaseSchema = void 0;
const express_validator_1 = require("express-validator");
exports.purchaseSchema = [
    (0, express_validator_1.body)("userName")
        .notEmpty()
        .withMessage("userName is required")
        .isString()
        .withMessage("User most be a string"),
    (0, express_validator_1.body)("_id")
        .notEmpty()
        .withMessage("_id is required")
        .isMongoId()
        .withMessage("invalid _id"),
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
exports.signInSchema = [
    (0, express_validator_1.body)("userEmail")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email"),
    (0, express_validator_1.body)("userPassword")
        .isLength({ min: 6 })
        .withMessage("password too short")
        .notEmpty()
        .withMessage("password is required"),
];
