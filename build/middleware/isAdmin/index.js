"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const enum_1 = require("../../types/enum");
const isAdmin = (req, res, next) => {
    if (req.decodedUserRole === enum_1.Roles.ADMIN) {
        next();
    }
    else {
        res.status(403).send({
            error: true,
            message: "Not Admin"
        });
    }
};
exports.isAdmin = isAdmin;
