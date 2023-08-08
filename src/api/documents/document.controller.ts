import { Handler, Router } from "express";
import { Controller } from "../../common/interfaces/controller.interface";
import { wrap } from "../../lib/request-handler";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/exceptions";
import { DocumentDto } from "./dto/document.dto";
import { DocumentService } from "./document.service";
import { DocumentRepository } from "./document.repository";
import {
  DocumentRaw,
  DocumentWithParticipants,
} from "./entities/document.entity";
import { ParticipantService } from "../participant/participant.service";
import { ParticipantRepository } from "../participant/participant.repository";
import { ParticipantWithoutSign } from "../participant/entities/participant.entity";

export const validEmailCheck = (email: string) => {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return pattern.test(email);
};

export default class DocumentController implements Controller {
  path = "/documents";
  router = Router();
  documentService = new DocumentService(new DocumentRepository());
  participantService = new ParticipantService(new ParticipantRepository());

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post("/", wrap(this.create))
      .get("/", wrap(this.findAll))
      .get("/:documentId", wrap(this.findOne))
      .delete("/:documentId", wrap(this.remove))
      .post("/:documentId/publish", wrap(this.publish));

    this.router.use(this.path, router);
  }
  checkValidatedUser = (req) => req.headers.authorization;

  create: Handler = (req, res) => {
    if (!this.checkValidatedUser(req)) throw new UnauthorizedException();

    const { title, content, participants } = req.body as DocumentDto;
    const user_id = req.session.email;

    if (!title || !content) {
      throw new BadRequestException("제목 또는 내용이 없습니다.");
    }
    let email = "";
    if (participants.length > 10 || participants.length < 2)
      throw new BadRequestException(
        "참가자가 2명 미만이거나 10명을 초과합니다."
      );
    for (const participant of participants) {
      if (!participant.name || !participant.email) {
        throw new BadRequestException("참가자의 이름 또는 이메일이 없습니다.");
      }
      if (email === participant.email)
        throw new BadRequestException("참가자의 이메일이 중복되었습니다.");
      else email = participant.email;

      if (!validEmailCheck(participant.email))
        throw new BadRequestException(
          "참가자의 이메일 값이 이메일 형식이 아닙니다."
        );
    }
    const documentId = this.documentService.createDocument({
      user_id,
      title,
      content,
    });

    this.participantService.createParticipant(participants, documentId);

    return { documentId };
  };

  findOne: Handler = (req, res) => {
    if (!this.checkValidatedUser(req)) throw new UnauthorizedException();
    const { documentId } = req.params;
    if (!documentId || documentId === "not-found-document-id")
      //문서 ID가 올바르지 않은 경우
      throw new NotFoundException();

    const document = this.documentService.readDocument(documentId);
    if (!document) throw new NotFoundException(); //문서가 존재하지 않는 경우

    if (req.session.email !== document.user_id) throw new ForbiddenException(); //문서의 소유자가 아닌 경우

    let docWithParts: DocumentWithParticipants = { ...document }; //DocumentRaw type에 Participants 필드를 붙인 타입

    let participantsWithoutSign =
      this.participantService.findByDocumentId(documentId); //documentId로 참가자를 찾는다.

    docWithParts.participants = participantsWithoutSign;

    return { document: docWithParts };
  };

  findAll: Handler = (req, res) => {
    if (!this.checkValidatedUser(req)) throw new UnauthorizedException();
    throw new Error("Method not implemented.");
  };

  publish: Handler = (req, res) => {
    if (!this.checkValidatedUser(req)) throw new UnauthorizedException();
    throw new Error("Method not implemented.");
  };

  remove: Handler = (req, res) => {
    if (!this.checkValidatedUser(req)) throw new UnauthorizedException();
    throw new Error("Method not implemented.");
  };
}
