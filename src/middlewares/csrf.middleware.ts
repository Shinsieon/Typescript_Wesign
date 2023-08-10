import { Handler } from "express";
import Tokens from "csrf";
import {
  ForbiddenException,
  UnauthorizedException,
} from "../common/exceptions";

export const CSRF_TOKEN_HEADER = "x-csrf-token";

const ignorePaths = ["/api"];
const tokens = new Tokens();

export const csrf = (): Handler => (req, res, next) => {
  //if (!req.session.csrfSecret) throw new UnauthorizedException(); //세션에 csrfSecret 정보가 없는 경우
  const sec = tokens.secretSync();
  const nToken = tokens.create(sec);
  res.setHeader(CSRF_TOKEN_HEADER, nToken);

  if (req.path !== ignorePaths[0]) {
    //헤더 검증
    const clientToken = req.headers[CSRF_TOKEN_HEADER] as string;
    if (!clientToken || clientToken !== req.session.csrfToken)
      throw new ForbiddenException();
    if (!req.session.csrfSecret) throw new UnauthorizedException();
  } else {
    //Sec 생성
    req.session.csrfSecret = sec;
  }
  req.session.csrfToken = nToken;

  next();
};
