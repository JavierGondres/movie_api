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
exports.RentalModel = void 0;
const mongodb_1 = require("mongodb");
class RentalModel {
    constructor(rentalsCollection, movieModel) {
        this.rentalsCollection = rentalsCollection;
        this.movieModel = movieModel;
    }
    insertRental(rentalDetails, movie) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, quantity, movieId } = rentalDetails;
                const dayToReturnMovie = new Date();
                dayToReturnMovie.setDate(dayToReturnMovie.getDate() + 20);
                const rentalObj = {
                    userId: new mongodb_1.ObjectId(_id),
                    movieId: new mongodb_1.ObjectId(movieId),
                    quantity: quantity,
                    rentalDate: new Date(),
                    rentalPrice: movie === null || movie === void 0 ? void 0 : movie.rentalPrice,
                    dayToReturnMovie: dayToReturnMovie,
                    penalty: movie === null || movie === void 0 ? void 0 : movie.penalty,
                    totalAmount: ((_a = movie === null || movie === void 0 ? void 0 : movie.rentalPrice) !== null && _a !== void 0 ? _a : 0) * (quantity !== null && quantity !== void 0 ? quantity : 0),
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
    rental(rentalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity, movieId } = rentalDetails;
            console.log("id", movieId);
            const movie = yield this.movieModel.validateMovieExistence(movieId);
            const stockValidationMessage = yield this.movieModel.validateStock(movie, quantity);
            if (stockValidationMessage) {
                return { error: true, message: stockValidationMessage };
            }
            const rentalInsertionMessage = yield this.insertRental(rentalDetails, movie);
            if (rentalInsertionMessage) {
                return { error: true, message: rentalInsertionMessage };
            }
            const stockUpdateMessage = yield this.movieModel.updateStock(movie, quantity);
            if (stockUpdateMessage) {
                return { error: true, message: stockUpdateMessage };
            }
            return { error: false, message: "Rental successful" };
        });
    }
}
exports.RentalModel = RentalModel;
