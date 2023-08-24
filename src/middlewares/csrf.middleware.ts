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
  const sec = tokens.secretSync();
  const nToken = tokens.create(sec);
  res.setHeader(CSRF_TOKEN_HEADER, nToken); //응답 헤더에 토큰을 내려줍니다.

  if (req.path !== ignorePaths[0]) {
    //헤더 검증
    const clientToken = req.headers[CSRF_TOKEN_HEADER] as string; //클라이언트가 보낸 헤더에서 토큰 값을 추출합니다.
    if (
      !clientToken ||
      (req.session.csrfToken && req.session.csrfToken !== clientToken)
    )
      //토큰 값이 없거나 세션에 담겨있는 토큰 값과 다르다면 에러를 뱉습니다.
      throw new ForbiddenException();
    if (!req.session.csrfSecret) throw new UnauthorizedException(); //세션에 담긴 secretKey가 없다면 에러를 뱉습니다.
  } else {
    //정상적인 요청이라면 세션에 secretKey를 담아줍니다.
    req.session.csrfSecret = sec;
  }

  req.session.csrfToken = nToken; //세션에 토큰 값을 담아줍니다.

  next();
};
