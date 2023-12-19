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
exports.PurchaseModel = void 0;
const mongodb_1 = require("mongodb");
class PurchaseModel {
    constructor(purchasesCollection, movieModel) {
        this.purchasesCollection = purchasesCollection;
        this.movieModel = movieModel;
    }
    insertPurchase(purchaseDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, userName, quantity, salePrice, movieId } = purchaseDetails;
                const purchaseObj = {
                    userId: new mongodb_1.ObjectId(_id),
                    movieId: new mongodb_1.ObjectId(movieId),
                    userName: userName,
                    quantity: quantity,
                    purchasedDate: new Date(),
                    salePrice: salePrice,
                };
                yield this.purchasesCollection.insertOne(purchaseObj);
                return null; // No hay error
            }
            catch (error) {
                console.log(error);
                return "Error inserting purchase";
            }
        });
    }
    purchase(purchaseDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity, movieId } = purchaseDetails;
            console.log("id", movieId);
            const movie = yield this.movieModel.validateMovieExistence(movieId);
            const stockValidationMessage = yield this.movieModel.validateStock(movie, quantity);
            if (stockValidationMessage) {
                return { error: true, message: stockValidationMessage };
            }
            const purchaseInsertionMessage = yield this.insertPurchase(purchaseDetails);
            if (purchaseInsertionMessage) {
                return { error: true, message: purchaseInsertionMessage };
            }
            const stockUpdateMessage = yield this.movieModel.updateStock(movie, quantity);
            if (stockUpdateMessage) {
                return { error: true, message: stockUpdateMessage };
            }
            return { error: false, message: "Purchase successful" };
        });
    }
}
exports.PurchaseModel = PurchaseModel;
