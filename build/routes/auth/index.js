"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const schema_1 = require("../../models/mongo/auth/schema");
const validateData_1 = require("../../middleware/validateData");
const createAuthRouter = ({ authModel }) => {
    const authRouter = (0, express_1.Router)();
    const authController = new auth_1.AuthController({ authModel });
    authRouter.post("/", (0, validateData_1.validateData)(schema_1.signUpSchema), authController.signUp);
    return authRouter;
};
exports.createAuthRouter = createAuthRouter;
