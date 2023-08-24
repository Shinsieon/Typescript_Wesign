"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrf = exports.CSRF_TOKEN_HEADER = void 0;
const csrf_1 = __importDefault(require("csrf"));
const exceptions_1 = require("../common/exceptions");
exports.CSRF_TOKEN_HEADER = "x-csrf-token";
const ignorePaths = ["/api"];
const tokens = new csrf_1.default();
const csrf = () => (req, res, next) => {
    const sec = tokens.secretSync();
    const nToken = tokens.create(sec);
    res.setHeader(exports.CSRF_TOKEN_HEADER, nToken);
    if (req.path !== ignorePaths[0]) {
        const clientToken = req.headers[exports.CSRF_TOKEN_HEADER];
        if (!clientToken || clientToken !== req.session.csrfToken)
            throw new exceptions_1.ForbiddenException();
        if (!req.session.csrfSecret)
            throw new exceptions_1.UnauthorizedException();
    }
    else {
        req.session.csrfSecret = sec;
    }
    req.session.csrfToken = nToken;
    next();
};
exports.csrf = csrf;
//# sourceMappingURL=csrf.middleware.js.map