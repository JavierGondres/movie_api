"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const generateJWT_1 = require("../../middleware/generateJWT");
const enum_1 = require("../../types/enum");
class AuthController {
    constructor({ authModel }) {
        this.signUp = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userEmail, userName, userPassword, userRole } = _req.body;
            try {
                const { error, userAccesToken } = yield (0, generateJWT_1.generateJWT)({
                    userName,
                    userRole,
                });
                if (error) {
                    return res.status(500).json({
                        error: true,
                        message: "Couldn't create access token. Please try again later.",
                    });
                }
                const result = yield this.authModel.signUp({
                    userName,
                    userEmail,
                    userPassword,
                    userRole: userRole || enum_1.Roles.USER,
                    userAccesToken,
                });
                if (!result) {
                    return res
                        .status(500)
                        .json({ ErrorMessag: "Hubo un error en el servidor" });
                }
                console.log({ userAccesToken: userAccesToken });
                return res.status(200).json(result);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json({
                    erroMessage: "Somethin went wrong in our server, try again later",
                });
            }
        });
        this.authModel = authModel;
    }
}
exports.AuthController = AuthController;
