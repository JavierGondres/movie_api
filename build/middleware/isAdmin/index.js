"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (roles) => (req, res, next) => {
    if (!req.decodedUserRole)
        return res.status(404).json({
            error: true,
            message: "Missing auth"
        });
    const isValid = roles.some(role => req.decodedUserRole.toLowerCase() === role);
    if (isValid) {
        return next();
    }
    else {
        return res.status(403).send({
            error: true,
            message: `Not ${roles}`
        });
    }
};
exports.isAdmin = isAdmin;
