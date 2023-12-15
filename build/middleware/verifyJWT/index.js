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
exports.ValidateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ValidateToken {
    constructor(userCollection) {
        this.validateToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const auhorizationHeader = req.headers.authorization;
            let result;
            if (!auhorizationHeader) {
                return res.status(401).json({
                    error: true,
                    message: "Access token is missing",
                });
            }
            const token = auhorizationHeader.split(" ")[1];
            try {
                let user = (yield this.userCollection.findOne({
                    userAccesToken: token,
                }));
                if (!user) {
                    result = {
                        error: true,
                        message: "Authorization denied",
                    };
                    return res.status(403).json(result);
                }
                result = jsonwebtoken_1.default.verify(token || "", process.env.JWT || "", (err, decoded) => {
                    // console.log(token)
                    if (err) {
                        console.log(err);
                        return res.status(403).json({ message: "Forbidden r37226" });
                    }
                    if (!(user === null || user === void 0 ? void 0 : user.userName) === decoded.userName) {
                        result = {
                            error: true,
                            message: "Invalid token",
                        };
                        return res.status(401).json(result);
                    }
                    req.decodedUserName = decoded.userName;
                    req.decodedUserRole = decoded.userRole;
                    req.isValid = user === null || user === void 0 ? void 0 : user.isValid;
                    next();
                });
            }
            catch (error) {
                console.log({ errorMessage: error });
                return res
                    .status(500)
                    .json({ message: "Something went wrong in authorization" });
            }
        });
        this.userCollection = userCollection;
    }
}
exports.ValidateToken = ValidateToken;
