"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exceptions_1 = require("../../common/exceptions");
const request_handler_1 = require("../../lib/request-handler");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
const jwt = __importStar(require("../../lib/jwt"));
const express_session_1 = __importDefault(require("express-session"));
class UserController {
    constructor() {
        this.path = "/users";
        this.router = express_1.Router();
        this.userService = new user_service_1.UserService(new user_repository_1.UserRepository());
        this.signUp = async (req) => {
            const { email, password, name } = req.body;
            if (!email) {
                throw new exceptions_1.BadRequestException("이메일은 필수입니다.");
            }
            if (!password) {
                throw new exceptions_1.BadRequestException("비밀번호는 필수입니다.");
            }
            else if (password.length < 8) {
                throw new exceptions_1.BadRequestException("비밀번호는 최소 8글자 이상입니다.");
            }
            if (!name) {
                throw new exceptions_1.BadRequestException("이름은 필수입니다.");
            }
            const { count: hasEmail } = this.userService.countByEmail(email);
            if (hasEmail) {
                throw new exceptions_1.BadRequestException("이미 가입된 이메일입니다.");
            }
            await this.userService.signUp({
                email,
                password,
                name,
            });
            return true;
        };
        this.login = async (req, res) => {
            const { email, password } = req.body;
            if (!email) {
                throw new exceptions_1.BadRequestException("이메일은 필수입니다.");
            }
            if (!password) {
                throw new exceptions_1.BadRequestException("비밀번호는 필수입니다.");
            }
            else if (password.length < 8) {
                throw new exceptions_1.BadRequestException("비밀번호는 최소 8글자 이상입니다.");
            }
            const [token, user] = await this.userService.login({ email, password });
            const { user_id } = jwt.verify(token);
            const { csrfSecret, csrfToken } = req.session;
            req.sessionStore.get(req.sessionID, (err, sessionData) => {
                console.log("야호", sessionData);
                if (!sessionData)
                    throw new exceptions_1.UnauthorizedException();
            });
            req.sessionStore.all((err, sessions) => {
                for (let sessionId in sessions) {
                    if (sessions[sessionId]["user_id"] === user_id) {
                        console.log("중복 로그인 발생?", sessions[sessionId], req.session);
                    }
                }
            });
            res.setHeader(user_id, user_id);
            req.session.user_id = user_id;
            req.session.email = email;
            return {
                token,
                user,
            };
        };
        this.me = (req, res) => {
            console.log("cookie from client2", req.headers.authorization);
            console.log("cookie from", req.headers.cookie);
            console.log("body from client", req.body);
            console.log("req.cookie", req.get("Cookie"));
            console.log("header from client", req.headers);
            console.log("session 값", req.session);
            console.log("header 값!", req.headers.user_id);
            console.log(req.headers);
            req.sessionStore.all((err, sessions) => {
                console.log(typeof sessions);
                console.log(Object.keys(sessions));
                console.log("ss22", express_session_1.default);
            });
            if (req.headers.authorization === undefined) {
                throw new exceptions_1.UnauthorizedException();
            }
            if (!req.headers)
                console.log("세션 정보가 없습니다.");
            const email = req.session.email;
            console.log("me!!!", req.session);
            const user = this.userService.findByEmail(email);
            return { user: user.toJson() };
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = express_1.Router();
        router
            .post("/signup", request_handler_1.wrap(this.signUp))
            .post("/login", request_handler_1.wrap(this.login))
            .get("/me", request_handler_1.wrap(this.me));
        this.router.use(this.path, router);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map