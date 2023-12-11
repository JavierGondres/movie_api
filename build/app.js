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
const mongodb_1 = require("mongodb");
// Replace the following with your Atlas connection string                                                                                                                                   
const url = "mongodb+srv://testUser:testUser22@cluster0.7uxpn75.mongodb.net/?retryWrites=true&w=majority";
console.log('hola');
// Connect to your Atlas cluster
const client = new mongodb_1.MongoClient(url);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Successfully connected to Atlas");
        }
        catch (err) {
            console.log(err.stack);
        }
        finally {
            yield client.close();
        }
    });
}
run().catch(console.dir);
