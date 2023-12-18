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
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateJWT_1 = require("../../../middleware/generateJWT");
dotenv_1.default.config();
class AuthModel {
    constructor(userCollection, userSessionsCollection) {
        this.userCollection = userCollection;
        this.userSessionsCollection = userSessionsCollection;
    }
    signUp({ userName, userEmail, userPassword, userRole }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            const passwordHash = yield bcrypt_1.default.hash(userPassword.toString(), 8);
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
                    userPassword: passwordHash,
                    userRole: userRole !== null && userRole !== void 0 ? userRole : "User",
                    isValid: true,
                };
                yield this.userCollection.insertOne(newUser);
                const userSessions = {
                    _id: newUser._id,
                    userSessions: [],
                };
                yield this.userSessionsCollection.insertOne(userSessions);
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
    signIn({ userEmail, userPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            const existUser = yield this.findUser({
                userEmail: userEmail,
            });
            if (!existUser) {
                message = "User doesnt exist";
                return {
                    error: true,
                    message: message,
                };
            }
            try {
                const user = existUser;
                const isValidPassowrd = yield bcrypt_1.default.compare(userPassword.toString(), user.userPassword.toString());
                if (!isValidPassowrd) {
                    message = "Password or email is incorrect";
                    return {
                        error: true,
                        message: message,
                    };
                }
                const { error, userAccesToken } = yield (0, generateJWT_1.generateJWT)({
                    userRole: user.userRole,
                });
                if (error) {
                    message =
                        "Couldn't create access token. Please try again later signIn.";
                    return {
                        error: true,
                        message: message,
                    };
                }
                try {
                    const accesToken = {
                        userAccesToken: userAccesToken,
                        isValid: true,
                    };
                    yield this.userSessionsCollection.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, { $push: { userSessions: [accesToken] } });
                }
                catch (error) {
                    console.log(error);
                    message = `Somethin went wron trying to login and create token`;
                    return {
                        error: true,
                        message: message,
                    };
                }
                message = `Welcome ${user.userName}, you are logged in`;
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = `Somethin went wron trying to login`;
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
    signOut({ userAccesToken, _id }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            try {
                const removeToken = yield this.userSessionsCollection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, {
                    $pull: {
                        userSessions: {
                            $elemMatch: { userAccesToken: userAccesToken },
                        },
                    },
                });
                if (removeToken.modifiedCount === 0) {
                    message = "User doesn't exist or wasn't modified";
                    return {
                        error: true,
                        message: message,
                    };
                }
                message = "Logout";
                return {
                    error: false,
                    message: message,
                };
            }
            catch (error) {
                console.log(error);
                message = "Problems with logging out";
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
    findUser(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userCollection.findOne(obj);
            return existUser;
        });
    }
}
exports.AuthModel = AuthModel;
