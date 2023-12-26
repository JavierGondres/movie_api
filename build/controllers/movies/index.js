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
exports.MovieController = void 0;
const enum_1 = require("../../types/enum");
class MovieController {
    constructor({ movieModel }) {
        this.createMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { availability, description, imageURL, rentalPrice, salePrice, stock, title, penalty, } = req.body;
            let result = {
                error: false,
                message: "Something went wrong",
            };
            try {
                result = yield this.movieModel.createMovie({
                    availability,
                    description,
                    imageURL,
                    lastModifiedDate: new Date(),
                    rentalPrice,
                    salePrice,
                    stock,
                    title,
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
        this.updateMovie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { availability, description, imageURL, rentalPrice, salePrice, stock, title, } = req.body;
            let result = {
                error: false,
                message: "Something went wrong",
            };
            let commonProperties = {
                description,
                imageURL,
                lastModifiedDate: new Date(),
                rentalPrice,
                salePrice,
                stock,
                title,
            };
            let movieObj;
            if (req.decodedUserRole === enum_1.Roles.ADMIN) {
                // Si el usuario es un administrador, agregamos la propiedad availability
                movieObj = Object.assign(Object.assign({}, commonProperties), { availability });
            }
            else {
                // Si no es un administrador, simplemente asignamos las propiedades comunes
                movieObj = Object.assign({}, commonProperties);
            }
            try {
                result = yield this.movieModel.updateMovie(id, movieObj);
                if (result.error)
                    return res.status(400).json(result);
                return res.status(200).json(result.message);
            }
            catch (e) {
                console.log(e);
                return res.status(501).json(result);
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let message;
            try {
                let { filterByAvailability, sortBy, title, page, perPage, sortOrder, sortProps, exclusions } = req.query;
                if (req.decodedUserRole === enum_1.Roles.USER || !req.decodedUserRole)
                    filterByAvailability = "available";
                const movies = yield this.movieModel.getAll(filterByAvailability, sortBy, title, Number(page), Number(perPage), sortOrder, sortProps, exclusions);
                if (!movies) {
                    message = "Error al obtener peliculas";
                    return res.status(500).json({
                        error: true,
                        message: message,
                    });
                }
                return res.status(200).json(movies);
            }
            catch (error) {
                console.log(error);
                message = "Error grave obtener peliculas";
                return res.status(500).json({
                    error: true,
                    message: message,
                });
            }
        });
        this.movieModel = movieModel;
    }
}
exports.MovieController = MovieController;
