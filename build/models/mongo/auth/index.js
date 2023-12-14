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
// import bcrypt from "bcryptjs"
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthModel {
    constructor(userCollection) {
        this.userCollection = userCollection;
    }
    signUp({ userName, userEmail, userPassword, userRole, userAccesToken, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            try {
                console.log("Sign");
                const existUser = yield this.userCollection.findOne({
                    userEmail: userEmail,
                });
                if (existUser) {
                    message = "Email in usage";
                    return {
                        error: true,
                        message: message,
                    };
                }
                const newUser = {
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword,
                    userAccesToken: userAccesToken,
                    userRole: userRole !== null && userRole !== void 0 ? userRole : "User",
                };
                yield this.userCollection.insertOne(newUser);
                message = "User created";
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = "Something went wrong";
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
}
exports.AuthModel = AuthModel;
