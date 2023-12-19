"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = void 0;
const express_1 = require("express");
const users_1 = require("../../controllers/users");
const verifyJWT_1 = require("../../middleware/verifyJWT");
const isAdmin_1 = require("../../middleware/isAdmin");
const enum_1 = require("../../types/enum");
const validateData_1 = require("../../middleware/validateData");
const schema_1 = require("../../models/mongo/users/schema");
const createUserRouter = ({ userModel, userSessionCollection, }) => {
    const usersRouter = (0, express_1.Router)();
    const usersController = new users_1.UsersController({ userModel });
    const validateToken = new verifyJWT_1.ValidateToken(userSessionCollection);
    /*
    Para que se pueda pasar una metodo de una clase en un middleWare, el metodo
    se debe convertir a funcion flecha o usar bind, por ejemplo instanciaDeMiClase.miMetodo.bind(instanciaDeMiClase)
    y asi no se pierde el contexto "this"
    */
    usersRouter.get("/", [validateToken.validateToken, (0, isAdmin_1.isAdmin)([enum_1.Roles.ADMIN])], usersController.getAll);
    usersRouter.post("/purchase", [
        (0, validateData_1.validateData)(schema_1.purchaseSchema),
        validateToken.validateToken,
        (0, isAdmin_1.isAdmin)([enum_1.Roles.USER, enum_1.Roles.ADMIN]),
    ], usersController.purchase);
    return usersRouter;
};
exports.createUserRouter = createUserRouter;
