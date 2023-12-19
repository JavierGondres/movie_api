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
    constructor(userCollection, movieCollection, purchasesCollection, rentalsCollection, movieModel) {
        this.userCollection = userCollection;
        this.movieCollection = movieCollection;
        this.purchasesCollection = purchasesCollection;
        this.rentalsCollection = rentalsCollection;
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
    validateMovieExistence(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = (yield this.movieCollection.findOne({
                    _id: new mongodb_1.ObjectId(movieId),
                }));
                return movie;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    validateStock(movie, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!movie) {
                return "Movie doesn't exist, purchase error";
            }
            else if (movie.stock < (quantity !== null && quantity !== void 0 ? quantity : 0)) {
                return "There's not enough items in stock";
            }
            else if (movie.stock === 0) {
                return "In stock is 0";
            }
            return null; // No hay error
        });
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
    insertRental(rentalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, userName, quantity, movieId, penalty, rentalPrice } = rentalDetails;
                const dayToReturnMovie = new Date();
                dayToReturnMovie.setDate(dayToReturnMovie.getDate() + 20);
                const rentalObj = {
                    userId: new mongodb_1.ObjectId(_id),
                    movieId: new mongodb_1.ObjectId(movieId),
                    userName: userName,
                    quantity: quantity,
                    rentalDate: new Date(),
                    rentalPrice: rentalPrice,
                    dayToReturnMovie: dayToReturnMovie,
                    penalty: penalty !== null && penalty !== void 0 ? penalty : (rentalPrice !== null && rentalPrice !== void 0 ? rentalPrice : 100) / 2,
                };
                yield this.rentalsCollection.insertOne(rentalObj);
                return null; // No hay error
            }
            catch (error) {
                console.log(error);
                return "Error inserting purchase";
            }
        });
    }
    updateStock(movie, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!movie) {
                return "Movie is null";
            }
            try {
                const newStock = {
                    stock: movie.stock - (quantity !== null && quantity !== void 0 ? quantity : 0),
                };
                const result = yield this.movieModel.updateMovie(movie._id, newStock);
                if (result.error) {
                    return "Error updating stock";
                }
                return null; // No hay error
            }
            catch (error) {
                console.log(error);
                return "Error updating stock";
            }
        });
    }
    purchase(purchaseDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity, movieId } = purchaseDetails;
            console.log("id", movieId);
            const movie = yield this.validateMovieExistence(movieId);
            const stockValidationMessage = yield this.validateStock(movie, quantity);
            if (stockValidationMessage) {
                return { error: true, message: stockValidationMessage };
            }
            const purchaseInsertionMessage = yield this.insertPurchase(purchaseDetails);
            if (purchaseInsertionMessage) {
                return { error: true, message: purchaseInsertionMessage };
            }
            const stockUpdateMessage = yield this.updateStock(movie, quantity);
            if (stockUpdateMessage) {
                return { error: true, message: stockUpdateMessage };
            }
            return { error: false, message: "Purchase successful" };
        });
    }
    rental(rentalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity, movieId } = rentalDetails;
            console.log("id", movieId);
            const movie = yield this.validateMovieExistence(movieId);
            const stockValidationMessage = yield this.validateStock(movie, quantity);
            if (stockValidationMessage) {
                return { error: true, message: stockValidationMessage };
            }
            const rentalInsertionMessage = yield this.insertRental(rentalDetails);
            if (rentalInsertionMessage) {
                return { error: true, message: rentalInsertionMessage };
            }
            const stockUpdateMessage = yield this.updateStock(movie, quantity);
            if (stockUpdateMessage) {
                return { error: true, message: stockUpdateMessage };
            }
            return { error: false, message: "Rental successful" };
        });
    }
}
exports.UserModel = UserModel;
