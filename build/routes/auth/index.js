"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const schema_1 = require("../../models/mongo/auth/schema");
const validateData_1 = require("../../middleware/validateData");
const verifyJWT_1 = require("../../middleware/verifyJWT");
// import { CheckIsValid } from "../../middleware/checkIsValid";
const createAuthRouter = ({ authModel, userSessionCollection, }) => {
    const authRouter = (0, express_1.Router)();
    const authController = new auth_1.AuthController({ authModel });
    const validateToken = new verifyJWT_1.ValidateToken(userSessionCollection);
    // const checkIsValid = new CheckIsValid()
    authRouter.post("/signIn", [(0, validateData_1.validateData)(schema_1.signInSchema)], authController.signIn);
    authRouter.post("/signUp", (0, validateData_1.validateData)(schema_1.signUpSchema), authController.signUp);
    authRouter.post("/signOut", validateToken.validateToken, authController.signOut);
    return authRouter;
};
exports.createAuthRouter = createAuthRouter;
