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
exports.PurchasesController = void 0;
class PurchasesController {
    constructor({ purchaseModel }) {
        this.purchase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { movieId, quantity } = req.body;
            const _id = req._id;
            if (!_id) {
                return res.status(500).json({
                    error: true,
                    message: "Error user id in rental",
                });
            }
            let result = {
                error: false,
                message: "Something went wrong",
            };
            try {
                result = yield this.purchaseModel.purchase({
                    _id,
                    movieId,
                    quantity,
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
        this.purchaseModel = purchaseModel;
    }
}
exports.PurchasesController = PurchasesController;
