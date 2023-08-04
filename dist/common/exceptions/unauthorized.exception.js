"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const http_exception_1 = require("./http.exception");
class UnauthorizedException extends http_exception_1.HttpException {
    constructor(message = "인증 자격 증명이 유효하지 않습니다.") {
        super(401, message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map