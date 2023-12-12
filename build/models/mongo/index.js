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
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.CONNECTION_STRING || "";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ uri });
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        try {
            yield client.connect();
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return client.db("movie_api");
            //   const movies = db.collection<Movies>("Movies");
            //   const users = db.collection<Users>("Users");
            //   return { client, db, movies, users };
        }
        catch (error) {
            console.error("Error connecting to the database");
            console.error(error);
            yield client.close();
            throw error;
        }
    });
}
exports.default = connect;
