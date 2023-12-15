"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieRouter = void 0;
const express_1 = require("express");
const validateData_1 = require("../../middleware/validateData");
const verifyJWT_1 = require("../../middleware/verifyJWT");
const movies_1 = require("../../controllers/movies");
const schema_1 = require("../../models/mongo/movies/schema");
const isAdmin_1 = require("../../middleware/isAdmin");
const createMovieRouter = ({ movieModel, userCollection, }) => {
    const movieRouter = (0, express_1.Router)();
    const movieController = new movies_1.MovieController({ movieModel });
    const validateToken = new verifyJWT_1.ValidateToken(userCollection);
    movieRouter.post("/", [(0, validateData_1.validateData)(schema_1.movieSchema), validateToken.validateToken, isAdmin_1.isAdmin], movieController.createMovie);
    //    movieRouter.post("/signUp", validateData(signUpSchema), movieController.signUp);
    return movieRouter;
};
exports.createMovieRouter = createMovieRouter;
