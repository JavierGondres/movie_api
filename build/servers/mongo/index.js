"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const auth_1 = require("../../models/mongo/auth");
const movies_1 = require("../../models/mongo/movies");
const users_1 = require("../../models/mongo/users");
const MongoSingleton_1 = require("../../services/MongoSingleton");
const enum_1 = require("../../types/enum");
const userCollection = MongoSingleton_1.MongoSingleton.getClient()
    .db(enum_1.DB.movie_api)
    .collection(enum_1.DBCollections.USERS);
const movieCollection = MongoSingleton_1.MongoSingleton.getClient()
    .db(enum_1.DB.movie_api)
    .collection(enum_1.DBCollections.MOVIES);
const userSessionCollection = MongoSingleton_1.MongoSingleton.getClient()
    .db(enum_1.DB.movie_api)
    .collection(enum_1.DBCollections.USER_SESSIONS);
const moviesLogsCollection = MongoSingleton_1.MongoSingleton.getClient()
    .db(enum_1.DB.movie_api)
    .collection(enum_1.DBCollections.MOVIE_LOGS);
(0, __1.createApp)({
    userModel: new users_1.UserModel(userCollection),
    authModel: new auth_1.AuthModel(userCollection, userSessionCollection),
    movieModel: new movies_1.MovieModel(movieCollection, moviesLogsCollection),
    userCollection: userCollection,
    movieCollection: movieCollection,
    userSessionCollection: userSessionCollection,
});
