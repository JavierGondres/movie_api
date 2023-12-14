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
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userEmail, userPassword, userAccesToken } = req.body;
            let result = {
                error: false,
                message: "Something went wrong",
            };
            try {
                result = yield this.authModel.signIn({
                    userEmail,
                    userPassword,
                    userAccesToken,
                });
                if (result.error)
                    return res.status(400).json(result);
                console.log(req.body);
                return res.status(200).json(result.message);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json(result);
            }
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userEmail, userName, userPassword, userRole } = req.body;
            let result = {
                error: false,
                message: "Something went wrong",
            };
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
                result = yield this.authModel.signUp({
                    userName,
                    userEmail,
                    userPassword,
                    userRole: userRole || enum_1.Roles.USER,
                    userAccesToken,
                });
                if (result.error)
                    return res.status(400).json(result);
                console.log({ userAccesToken: userAccesToken });
                return res.status(200).json(result.message);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json(result);
            }
        });
        this.authModel = authModel;
    }
}
exports.AuthController = AuthController;
