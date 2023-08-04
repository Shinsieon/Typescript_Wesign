"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_exception_1 = require("./http.exception");
class BadRequestException extends http_exception_1.HttpException {
    constructor(message = "잘못된 요청입니다.") {
        super(400, message);
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=bad-request.exception.js.map