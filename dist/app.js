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
const express_1 = __importStar(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const csrf_middleware_1 = require("./middlewares/csrf.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen() {
        var _a;
        const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
        this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_session_1.default({
            name: "prgrms.sid",
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: true,
        }));
        this.app.use(csrf_middleware_1.csrf());
        this.app.use(auth_middleware_1.verifyJWT);
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
    initializeControllers(controllers) {
        const router = express_1.Router();
        router.get("/", (req, res) => res.send("OK"));
        controllers.forEach((controller) => {
            router.use(controller.router);
        });
        this.app.use("/api", router);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map