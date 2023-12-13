"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const auth_1 = require("../../models/mongo/auth");
const users_1 = require("../../models/mongo/users");
const MongoSingleton_1 = require("../../services/MongoSingleton");
const enum_1 = require("../../types/enum");
const db = MongoSingleton_1.MongoSingleton.getClient()
    .db(enum_1.DB.movie_api)
    .collection(enum_1.DBCollections.USERS);
(0, __1.createApp)({ userModel: new users_1.UserModel(db), authModel: new auth_1.AuthModel(db), db: db });
