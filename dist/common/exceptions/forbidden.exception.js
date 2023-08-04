"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const http_exception_1 = require("./http.exception");
class ForbiddenException extends http_exception_1.HttpException {
    constructor(message = "접근 권한이 없습니다.") {
        super(403, message);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map