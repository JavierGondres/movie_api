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
exports.createApp = void 0;
const express_1 = __importStar(require("express"));
const users_1 = require("./routes/users");
const auth_1 = require("./routes/auth");
const movies_1 = require("./routes/movies");
const rentals_1 = require("./routes/rentals");
const purchases_1 = require("./routes/purchases");
// import cors from "cors";
const createApp = ({ userModel, authModel, movieModel, rentalModel, purchaseModel, userSessionCollection }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const app = (0, express_1.default)();
    app.use((0, express_1.json)());
    app.disable("x-powered-by");
    app.use("/users", (0, users_1.createUserRouter)({ userModel: userModel, userSessionCollection: userSessionCollection }));
    app.use("/auth", (0, auth_1.createAuthRouter)({ authModel: authModel, userSessionCollection: userSessionCollection }));
    app.use("/movies", (0, movies_1.createMovieRouter)({
        movieModel: movieModel,
        userSessionCollection: userSessionCollection
    }));
    app.use("/rentals", (0, rentals_1.createRentalRouter)({
        rentalModel: rentalModel,
        userSessionCollection: userSessionCollection
    }));
    app.use("/purchases", (0, purchases_1.createPurchaseRouter)({
        purchaseModel: purchaseModel,
        userSessionCollection: userSessionCollection
    }));
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234;
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`);
    });
});
exports.createApp = createApp;
