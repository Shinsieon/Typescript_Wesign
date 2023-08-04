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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const exceptions_1 = require("../../common/exceptions");
const config_1 = require("../../config");
const jwt = __importStar(require("../../lib/jwt"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findById(id) {
        return this.userRepository.findById(id);
    }
    findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    countByEmail(email) {
        return this.userRepository.countByEmail(email);
    }
    async signUp({ name, email, password }) {
        const { count: hasEmail } = this.countByEmail(email);
        if (hasEmail) {
            throw new exceptions_1.BadRequestException("중복된 이메일이 있습니다.");
        }
        const encreyptedPassword = await bcryptjs_1.hash(password, config_1.hashRounds);
        const id = uuid_1.v4();
        const now = new Date().toISOString();
        this.userRepository.create({
            id,
            email,
            name,
            password: encreyptedPassword,
            created_at: now,
            updated_at: now,
        });
        return id;
    }
    async login({ email, password }) {
        const user = this.findByEmail(email);
        if (!user) {
            throw new exceptions_1.BadRequestException("이메일 또는 비밀번호를 다시 확인해 주세요.");
        }
        const isValidPassword = await bcryptjs_1.compare(password, user.password);
        if (!isValidPassword) {
            throw new exceptions_1.BadRequestException("이메일 또는 비밀번호를 다시 확인해 주세요.");
        }
        if (email !== user.email)
            throw new exceptions_1.UnauthorizedException();
        const token = jwt.sign({
            user_id: user.id,
            email,
        });
        return [token, user.toJson()];
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map