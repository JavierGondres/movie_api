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
exports.UserModel = void 0;
const mongodb_1 = require("mongodb");
class UserModel {
    constructor(userCollection, movieCollection, purchasesCollection, movieModel) {
        this.userCollection = userCollection;
        this.movieCollection = movieCollection;
        this.purchasesCollection = purchasesCollection;
        this.movieModel = movieModel;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userCollection.find({}).toArray();
                console.log(users);
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
    purchase({ _id, movieId, userName, quantity, salePrice, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            let existMovie;
            try {
                existMovie = (yield this.movieCollection.findOne({
                    _id: new mongodb_1.ObjectId(movieId),
                }));
                if (!existMovie) {
                    message = "Movie dosent exist, purchase error";
                    return {
                        error: true,
                        message: message,
                    };
                }
                else if (existMovie.stock < (quantity !== null && quantity !== void 0 ? quantity : 0)) {
                    message = "Theres not enough items in stock";
                    return {
                        error: true,
                        message: message,
                    };
                }
                else if (existMovie.stock === 0) {
                    message = "In stock 0";
                    return {
                        error: true,
                        message: message,
                    };
                }
            }
            catch (error) {
                console.log(error);
                message = "Error trying to look for a movie";
                return {
                    error: true,
                    message: message,
                };
            }
            try {
                const purchaseObj = {
                    userId: _id,
                    userName: userName,
                    quantity: quantity,
                    purchasedDate: new Date(),
                    salePrice: salePrice,
                };
                console.log("movieID", movieId);
                yield this.purchasesCollection.insertOne(purchaseObj);
                try {
                    const newStock = {
                        stock: existMovie.stock - (quantity !== null && quantity !== void 0 ? quantity : 0),
                    };
                    const result = yield this.movieModel.updateMovie(movieId, newStock);
                    if (result.error) {
                        return result;
                    }
                }
                catch (e) {
                    console.log(e);
                    message = "Error trying to reduce stock";
                    return {
                        error: true,
                        message: message,
                    };
                }
                message = "Purchased";
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = "Something went wrong buying";
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
}
exports.UserModel = UserModel;
