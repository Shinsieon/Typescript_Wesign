"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    res.status(status).send({
        success: false,
        response: null,
        error: { status, message },
    });
    next();
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map