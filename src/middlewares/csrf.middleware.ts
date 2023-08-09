import { Handler } from "express";
import Tokens from "csrf";
import { UnauthorizedException } from "../common/exceptions";

export const CSRF_TOKEN_HEADER = "x-csrf-token";

const ignorePaths = ["/api"];
const tokens = new Tokens();

export const csrf = (): Handler => (req, res, next) => {
  //if (!req.session.csrfSecret) throw new UnauthorizedException(); //세션에 csrfSecret 정보가 없는 경우
  const path_ = req.path.split("/")[1];
  console.log("path!_:", req.headers);
  console.log("Res!");
  console.log("req!", req.body);
  if (ignorePaths.includes("/" + path_)) {
    const sec = tokens.secretSync();
    req.session.csrfSecret = sec;
    res.header[CSRF_TOKEN_HEADER] = tokens.create(sec);
  } else {
    //x-csrf-token 검증
    console.log("hello!", req.headers);
  }

  next();
};
