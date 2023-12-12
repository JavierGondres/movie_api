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
const MongoSingleton_1 = require("../../../services/MongoSingleton");
const enum_1 = require("../../../types/enum");
const db = MongoSingleton_1.MongoSingleton.getClient().db(enum_1.DB.movie_api).collection(enum_1.DBCollections.USERS);
class UserModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield db.find({}).toArray();
                console.log(users);
                return (users);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UserModel = UserModel;
