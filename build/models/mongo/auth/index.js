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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const MongoSingleton_1 = require("../../../services/MongoSingleton");
const enum_1 = require("../../../types/enum");
// import bcrypt from "bcryptjs"
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = MongoSingleton_1.MongoSingleton.getClient()
    .db(enum_1.DB.movie_api)
    .collection(enum_1.DBCollections.USERS);
class AuthModel {
    static signUp({ userName, userEmail, userPassword, userRole, userAccesToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Sign");
                console.log({ tokenModel: userAccesToken });
                const newUser = {
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword,
                    userAccesToken: userAccesToken,
                    userRole: userRole !== null && userRole !== void 0 ? userRole : "User",
                };
                const result = yield db.insertOne(newUser);
                return result.insertedId;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.AuthModel = AuthModel;
