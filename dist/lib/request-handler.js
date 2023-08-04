"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
const wrap = (handler) => async (req, res, next) => {
    try {
        const response = await handler(req, res, next);
        const wrapResponse = {
            success: res.statusCode === 200 ? true : false,
            response: res.statusCode === 200 ? response : null,
            error: res.statusCode === 200 ? null : response,
        };
        res.json(wrapResponse);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.wrap = wrap;
//# sourceMappingURL=request-handler.js.map