"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchaseRouter = void 0;
const express_1 = require("express");
const verifyJWT_1 = require("../../middleware/verifyJWT");
const isAdmin_1 = require("../../middleware/isAdmin");
const enum_1 = require("../../types/enum");
const validateData_1 = require("../../middleware/validateData");
const schema_1 = require("../../models/mongo/users/schema");
const purchases_1 = require("../../controllers/purchases");
const createPurchaseRouter = ({ purchaseModel, userSessionCollection, }) => {
    const purchaseRouter = (0, express_1.Router)();
    const purchaseController = new purchases_1.PurchasesController({ purchaseModel });
    const validateToken = new verifyJWT_1.ValidateToken(userSessionCollection);
    purchaseRouter.post("/", [
        (0, validateData_1.validateData)(schema_1.purchaseSchema),
        validateToken.validateToken,
        (0, isAdmin_1.isAdmin)([enum_1.Roles.USER, enum_1.Roles.ADMIN]),
    ], purchaseController.purchase);
    return purchaseRouter;
};
exports.createPurchaseRouter = createPurchaseRouter;
