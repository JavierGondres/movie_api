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
class UserModel {
    constructor(userCollection, movieModel) {
        this.userCollection = userCollection;
        this.movieModel = movieModel;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userCollection.find({}).toArray();
                console.log(users);
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
    likeMovie({ _id }) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = "Something went wrong in likes";
            try {
                const result = yield this.movieModel.likeMovie(_id);
                return result;
            }
            catch (error) {
                console.log(error);
                return {
                    error: true,
                    message: message,
                };
            }
        });
    }
}
exports.UserModel = UserModel;
