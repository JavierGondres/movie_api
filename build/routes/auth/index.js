"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const createAuthRouter = ({ authModel }) => {
    const authRouter = (0, express_1.Router)();
    const authController = new auth_1.AuthController({ authModel });
    authRouter.post("/", authController.signUp);
    return authRouter;
};
exports.createAuthRouter = createAuthRouter;
