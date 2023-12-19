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
exports.UsersController = void 0;
const enum_1 = require("../../types/enum");
class UsersController {
    constructor({ userModel }) {
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userModel.getAll();
                if (!users) {
                    console.log(users);
                    return res
                        .status(500)
                        .json({ ErrorMessag: "Hubo un error en el servidor" });
                }
                return res.status(200).json(users);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json({ MessageError: e });
            }
        });
        this.purchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id, movieId, userName, quantity, salePrice } = req.body;
            let result = {
                error: false,
                message: "Something went wrong",
            };
            try {
                result = yield this.userModel.purchase({
                    _id,
                    movieId,
                    userName,
                    quantity,
                    salePrice,
                });
                if (result.error)
                    return res.status(400).json(result);
                return res.status(200).json(result.message);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json(result);
            }
        });
        this.rental = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { _id, movieId, userName, quantity, rentalPrice, penalty } = req.body;
            let result = {
                error: false,
                message: "Something went wrong",
            };
            if (req.decodedUserRole !== enum_1.Roles.ADMIN)
                penalty = undefined;
            try {
                result = yield this.userModel.rental({
                    _id,
                    movieId,
                    userName,
                    quantity,
                    rentalPrice,
                    penalty,
                });
                if (result.error)
                    return res.status(400).json(result);
                return res.status(200).json(result.message);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json(result);
            }
        });
        this.userModel = userModel;
    }
}
exports.UsersController = UsersController;
