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
exports.MovieModel = void 0;
const mongodb_1 = require("mongodb");
class MovieModel {
    constructor(movieCollection, moviesLogsCollection) {
        this.movieCollection = movieCollection;
        this.moviesLogsCollection = moviesLogsCollection;
    }
    createMovie({ availability, description, imageURL, lastModifiedDate, rentalPrice, salePrice, stock, title, penalty, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            const existMovie = yield this.findMovieByTitle({
                title: title,
            });
            if (existMovie) {
                message = "That movie already exist";
                return {
                    error: true,
                    message: message,
                };
            }
            try {
                const newMovie = {
                    availability: availability,
                    description: description,
                    imageURL: imageURL,
                    lastModifiedDate: lastModifiedDate,
                    rentalPrice: rentalPrice,
                    salePrice: salePrice,
                    stock: stock,
                    title: title,
                    penalty: penalty,
                    likes: 0,
                    updatesLog: [],
                };
                yield this.movieCollection.insertOne(newMovie);
                message = "Movie created";
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = "Something went wrong creating movie";
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
    updateMovie(_id, movieObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            console.log(_id);
            try {
                const updatedMovie = yield this.movieCollection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, { $set: movieObj });
                if (updatedMovie.modifiedCount === 0) {
                    message = "That movie dosent exist or wasnt modified";
                    return {
                        error: true,
                        message: message,
                    };
                }
                try {
                    const { title, rentalPrice, salePrice, lastModifiedDate } = movieObj;
                    if (title || rentalPrice || salePrice) {
                        const movieLog = Object.assign(Object.assign(Object.assign(Object.assign({ movieId: new mongodb_1.ObjectId(_id) }, (title && { title })), (rentalPrice && { rentalPrice })), (salePrice && { salePrice })), { lastModifiedDate: lastModifiedDate || new Date() });
                        //debo separar la logica aqui y modularizar mas
                        yield this.moviesLogsCollection.insertOne(movieLog);
                        const latestMovieLogs = yield this.moviesLogsCollection
                            .find({ movieId: new mongodb_1.ObjectId(_id) })
                            .sort({ lastModifiedDate: -1 })
                            .limit(5)
                            .toArray();
                        console.log(latestMovieLogs);
                        yield this.movieCollection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, { $set: { updatesLog: latestMovieLogs } });
                    }
                }
                catch (error) {
                    console.log(error);
                    message = "Something went wrong creating movieLog";
                    return {
                        error: true,
                        message: message,
                    };
                }
                message = "Movie updated";
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = "Something went wrong updating movie";
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
    getAll(filterByAvailability, sortBy, title, page, perPage, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                let sort = {
                    title: sortOrder === "desc" ? -1 : 1,
                };
                if (filterByAvailability === "available") {
                    query.availability = true;
                }
                else if (filterByAvailability === "unavailable") {
                    query.availability = false;
                }
                // Ordenar por título por defecto
                if (sortBy === "popularity") {
                    sort = { likes: sortOrder === "desc" ? -1 : 1 }; // Ordenar por popularidad (likes)
                }
                if (title) {
                    query.title = { $regex: title, $options: "i" };
                }
                if (!perPage)
                    perPage = 10;
                if (!page)
                    page = 1;
                const skip = (page - 1) * perPage;
                console.log("Query", query);
                console.log("Sort", sort);
                // Obtener resultados
                const movies = yield this.movieCollection
                    .find(query)
                    .sort(sort)
                    .skip(skip)
                    .limit(perPage)
                    .toArray();
                return movies;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    findMovieByTitle({ title }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existMovie = yield this.movieCollection.findOne({
                title: title,
            });
            return existMovie;
        });
    }
    findMovie(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const existMovie = yield this.movieCollection.findOne(obj);
            return existMovie;
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
    updateStock(movie, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!movie) {
                return "Movie is null";
            }
            try {
                const newStock = {
                    stock: movie.stock - (quantity !== null && quantity !== void 0 ? quantity : 0),
                };
                const result = yield this.updateMovie(movie._id, newStock);
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
    likeMovie(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            try {
                const like = yield this.movieCollection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, {
                    $inc: { likes: 1 },
                });
                console.log("model", _id);
                if (like.modifiedCount === 0) {
                    message = "Couldnt update or not found";
                    return {
                        error: true,
                        message: message,
                    };
                }
                message = "Liked";
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = "Error en likes";
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
}
exports.MovieModel = MovieModel;
