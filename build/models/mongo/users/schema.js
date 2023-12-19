"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeSchema = exports.rentalSchema = exports.purchaseSchema = void 0;
const express_validator_1 = require("express-validator");
exports.purchaseSchema = [
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
];
exports.rentalSchema = [
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
    (0, express_validator_1.body)("penalty")
        .isNumeric()
        .withMessage("Invalid quantity")
        .optional()
];
exports.likeSchema = [
    (0, express_validator_1.body)("_id")
        .notEmpty()
        .withMessage("_id is required")
        .isMongoId()
        .withMessage("invalid _id"),
];
