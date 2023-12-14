"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const enum_1 = require("../../types/enum");
const isAdmin = (req, res, next) => {
    if (!req.decodedUserRole)
        return res.status(404).json({
            error: true,
            message: "Missing auth"
        });
    if (req.decodedUserRole.toLowerCase() === enum_1.Roles.ADMIN) {
        return next();
    }
    else {
        return res.status(403).send({
            error: true,
            message: "Not Admin"
        });
    }
};
exports.isAdmin = isAdmin;
