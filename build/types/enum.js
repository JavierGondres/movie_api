"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.DBCollections = exports.DB = void 0;
var DB;
(function (DB) {
    DB["movie_api"] = "movie_api";
})(DB || (exports.DB = DB = {}));
var DBCollections;
(function (DBCollections) {
    DBCollections["USERS"] = "Users";
    DBCollections["MOVIES"] = "Movies";
})(DBCollections || (exports.DBCollections = DBCollections = {}));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "Admin";
    Roles["USER"] = "User";
})(Roles || (exports.Roles = Roles = {}));
