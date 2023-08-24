import { Router } from "express";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/exceptions";
import { Controller } from "../../common/interfaces/controller.interface";
import { Handler, wrap } from "../../lib/request-handler";
import { LoginDto, LoginResponse } from "./dto/login.dto";
import { SignUpDto, SignUpResponse } from "./dto/signup.dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import * as jwt from "../../lib/jwt";

export default class UserController implements Controller {
  path = "/users";
  router = Router();

  userService = new UserService(new UserRepository());

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post("/signup", wrap(this.signUp))
      .post("/login", wrap(this.login))
      .get("/me", wrap(this.me));

    this.router.use(this.path, router);
  }

  signUp: Handler = async (req): Promise<SignUpResponse> => {
    const { email, password, name } = req.body as SignUpDto;

    if (!email) {
      throw new BadRequestException("이메일은 필수입니다.");
    }

    if (!password) {
      throw new BadRequestException("비밀번호는 필수입니다.");
    } else if (password.length < 8) {
      throw new BadRequestException("비밀번호는 최소 8글자 이상입니다.");
    }

    if (!name) {
      throw new BadRequestException("이름은 필수입니다.");
    }

    const { count: hasEmail } = this.userService.countByEmail(email);
    if (hasEmail) {
      throw new BadRequestException("이미 가입된 이메일입니다.");
    }

    await this.userService.signUp({
      email,
      password,
      name,
    });

    return true;
  };

  login: Handler = async (req, res): Promise<LoginResponse> => {
    const { email, password } = req.body as LoginDto;

    if (!email) {
      throw new BadRequestException("이메일은 필수입니다.");
    }

    if (!password) {
      throw new BadRequestException("비밀번호는 필수입니다.");
    } else if (password.length < 8) {
      throw new BadRequestException("비밀번호는 최소 8글자 이상입니다.");
    }

    const [token, user] = await this.userService.login({ email, password });
    const { user_id } = jwt.verify(token) as jwt.JwtPayloadOfUser;
    const { csrfSecret, csrfToken } = req.session;

    req.sessionStore.all((err, sessions) => {
      for (let sessionId in sessions) {
        if (sessions[sessionId]["user_id"] === user_id) {
          console.log("중복 로그인 발생?", sessions[sessionId], req.session);
          if (sessions[sessionId].csrfSecret !== csrfSecret) {
            req.sessionStore.destroy(sessionId, () => {
              console.log("제거 성공!");
              console.log("이 세션 id 는 없습니다.", sessionId);
            });
          }
        }
      }
    });
    req.session.user_id = user_id;

    req.session.email = email;
    return {
      token,
      user,
    };
  };

  me: Handler = (req, res) => {
    if (!req.get("Cookie")) throw new UnauthorizedException();

    if (req.headers.authorization === undefined) {
      throw new UnauthorizedException();
    }
    const email = req.session.email;
    const user = this.userService.findByEmail(email);
    return { user: user.toJson() };
  };
}
