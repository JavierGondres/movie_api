"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
const express_1 = require("express");
const users_1 = require("../../controllers/users");
const createUserRouter = ({ userModel }) => {
    const usersRouter = (0, express_1.Router)();
    const usersController = new users_1.UsersController({ userModel });
    usersRouter.get("/", usersController.getAll);
    return usersRouter;
};
exports.createUserRouter = createUserRouter;
