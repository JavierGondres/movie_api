"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const enum_1 = require("../../../types/enum");
const express_validator_1 = require("express-validator");
exports.signUpSchema = [
    (0, express_validator_1.body)("userName")
        .notEmpty()
        .withMessage("userName is required")
        .isString()
        .withMessage("User most be a string"),
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
    (0, express_validator_1.body)("userRole")
        .toLowerCase()
        .isIn(Object.values(enum_1.Roles).map((e) => e.toLocaleLowerCase()))
        .withMessage("Invalid role")
        .optional(),
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
