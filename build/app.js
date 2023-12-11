"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
// import { MongoClient } from "mongodb";
const express_1 = __importStar(require("express"));
// Replace the following with your Atlas connection string                                                                                                                                   
const createApp = () => {
    var _a;
    const app = (0, express_1.default)();
    app.use((0, express_1.json)());
    app.disable("x-powered-by");
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234;
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`);
    });
};
exports.createApp = createApp;
(0, exports.createApp)();
// const url = "mongodb+srv://testUser:testUser22@cluster0.7uxpn75.mongodb.net/?retryWrites=true&w=majority";
// console.log('hola')
// // Connect to your Atlas cluster
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Successfully connected to Atlas");
//     } catch (err: any) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
