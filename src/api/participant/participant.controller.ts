import { Router } from "express";
import { Controller } from "../../common/interfaces/controller.interface";
import { Handler, wrap } from "../../lib/request-handler";
import { ParticipantTokenDto, ParticipantTokenResponse } from "./dto/token.dto";
import { ParticipantRepository } from "./participant.repository";
import { ParticipantService } from "./participant.service";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/exceptions";
import { DocumentService } from "../documents/document.service";
import { DocumentRepository } from "../documents/document.repository";

export default class ParticipantController implements Controller {
  path = "/participant";
  router = Router();

  participantService = new ParticipantService(new ParticipantRepository());
  documentService = new DocumentService(new DocumentRepository());

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post("/token", wrap(this.token))
      .get("/document", wrap(this.readDocument))
      .post("/sign", wrap(this.sign));

    this.router.use(this.path, router);
  }

  token: Handler = (req): ParticipantTokenResponse => {
    const { documentId, email } = req.body as ParticipantTokenDto;

    const [token, participant] = this.participantService.issueAccessToken({
      documentId,
      email,
    });
    const { csrfSecret } = req.session;
    req.sessionStore.all((err, sessions) => {
      for (let sessionId in sessions) {
        if (sessions[sessionId]["email"] === email) {
          if (sessions[sessionId].csrfSecret !== csrfSecret) {
            req.sessionStore.destroy(sessionId, () => {});
          }
        }
      }
    });

    req.session.email = participant.email;

    return {
      token,
      participant,
    };
  };

  readDocument: Handler = (req, res) => {
    if (!req.headers.authorization) throw new UnauthorizedException();
    const { email } = req.session;
    const participant = this.participantService.findByEmail(email);
    const document = this.documentService.readDocument(participant.documentId);
    return { document };
  };

  sign: Handler = (req, res) => {
    if (!req.headers.authorization) throw new UnauthorizedException(); //인증정보가 없다면 401 에러를 뱉습니다.
    const { signature } = req.body;
    const { email } = req.session;
    if (!signature) throw new BadRequestException(); //서명이 없으면 400 에러를 뱉습니다.
    const participant = this.participantService.findByEmail(email);
    if (participant.status === "SIGNED") throw new BadRequestException(); //이미 서명을 했다면 400 에러를 뱉습니다.

    return this.participantService.sign(email);
  };
}
