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
class AuthController {
    constructor({ authModel }) {
        this.signUp = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userEmail, userName, userPassword, userType } = _req.body;
            console.log({ userName, userEmail, userPassword, userType });
            try {
                const tokenId = yield this.authModel.signUp({
                    userEmail,
                    userName,
                    userPassword,
                    userType,
                });
                if (!tokenId) {
                    console.log(tokenId);
                    return res
                        .status(500)
                        .json({ ErrorMessag: "Hubo un error en el servidor" });
                }
                return res.status(200).json(tokenId);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json({ MessageError: e });
            }
        });
        this.authModel = authModel;
    }
}
exports.AuthController = AuthController;
