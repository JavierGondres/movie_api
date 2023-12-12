"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSingleton = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.CONNECTION_STRING || "";
class MongoSingleton {
    static isInitialized() {
        return this.mongoClient !== undefined;
    }
    static getClient() {
        if (this.isInitialized())
            return this.mongoClient;
        // Initialize the connection.
        this.mongoClient = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        return this.mongoClient;
    }
}
exports.MongoSingleton = MongoSingleton;
