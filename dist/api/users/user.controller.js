"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exceptions_1 = require("../../common/exceptions");
const request_handler_1 = require("../../lib/request-handler");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
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
            req.session.email = email;
            return {
                token,
                user,
            };
        };
        this.me = (req, res) => {
            const email = req.session.email;
            const user = this.userService.findByEmail(email);
            console.log(req.session);
            if (user)
                throw new exceptions_1.UnauthorizedException();
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