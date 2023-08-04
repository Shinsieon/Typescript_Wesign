"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrf = exports.CSRF_TOKEN_HEADER = void 0;
const csrf_1 = __importDefault(require("csrf"));
exports.CSRF_TOKEN_HEADER = "x-csrf-token";
const ignorePaths = ["/api"];
const tokens = new csrf_1.default();
const csrf = () => (req, res, next) => {
    next();
};
exports.csrf = csrf;
//# sourceMappingURL=csrf.middleware.js.map