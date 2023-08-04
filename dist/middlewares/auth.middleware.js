"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const exceptions_1 = require("../common/exceptions");
const jwt_1 = require("../lib/jwt");
const verifyJWT = (req, res, next) => {
    const bearerToken = req.header("authorization");
    if (bearerToken) {
        try {
            const token = bearerToken.replace(/^Bearer /, "");
            const decoded = jwt_1.verify(token);
            next();
        }
        catch (err) {
            next(new exceptions_1.UnauthorizedException());
        }
    }
    else {
        next();
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=auth.middleware.js.map