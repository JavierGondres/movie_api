"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieRouter = void 0;
const express_1 = require("express");
const validateData_1 = require("../../middleware/validateData");
const verifyJWT_1 = require("../../middleware/verifyJWT");
const movies_1 = require("../../controllers/movies");
const schema_1 = require("../../models/mongo/movies/schema");
const isAdmin_1 = require("../../middleware/isAdmin");
const enum_1 = require("../../types/enum");
// import { CheckIsValid } from "../../middleware/checkIsValid";
const createMovieRouter = ({ movieModel, userSessionCollection, }) => {
    const movieRouter = (0, express_1.Router)();
    const movieController = new movies_1.MovieController({ movieModel });
    const validateToken = new verifyJWT_1.ValidateToken(userSessionCollection);
    movieRouter.post("/", [
        (0, validateData_1.validateData)(schema_1.movieSchema),
        validateToken.validateToken,
        (0, isAdmin_1.isAdmin)([enum_1.Roles.ADMIN]),
    ], movieController.createMovie);
    movieRouter.put("/", (0, validateData_1.validateData)(schema_1.updateMovieSchema), validateToken.validateToken, (0, isAdmin_1.isAdmin)([enum_1.Roles.ADMIN]), movieController.updateMovie);
    movieRouter.get("/", validateToken.validateToken, movieController.getAll);
    return movieRouter;
};
exports.createMovieRouter = createMovieRouter;
