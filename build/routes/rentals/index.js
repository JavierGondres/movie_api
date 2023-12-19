"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRentalRouter = void 0;
const express_1 = require("express");
const verifyJWT_1 = require("../../middleware/verifyJWT");
const isAdmin_1 = require("../../middleware/isAdmin");
const enum_1 = require("../../types/enum");
const validateData_1 = require("../../middleware/validateData");
const schema_1 = require("../../models/mongo/users/schema");
const rentals_1 = require("../../controllers/rentals");
const createRentalRouter = ({ rentalModel, userSessionCollection, }) => {
    const rentalRouter = (0, express_1.Router)();
    const rentalController = new rentals_1.RentalController({ rentalModel });
    const validateToken = new verifyJWT_1.ValidateToken(userSessionCollection);
    rentalRouter.post("/", [
        (0, validateData_1.validateData)(schema_1.rentalSchema),
        validateToken.validateToken,
        (0, isAdmin_1.isAdmin)([enum_1.Roles.USER, enum_1.Roles.ADMIN]),
    ], rentalController.rental);
    return rentalRouter;
};
exports.createRentalRouter = createRentalRouter;
