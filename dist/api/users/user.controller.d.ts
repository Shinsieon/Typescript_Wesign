import { Controller } from "../../common/interfaces/controller.interface";
import { Handler } from "../../lib/request-handler";
import { UserService } from "./user.service";
export default class UserController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    userService: UserService;
    constructor();
    initializeRoutes(): void;
    signUp: Handler;
    login: Handler;
    me: Handler;
}
