import { Router } from "express";
import { Controller } from "../../common/interfaces/controller.interface";
import { Handler, wrap } from "../../lib/request-handler";
import { ParticipantTokenDto, ParticipantTokenResponse } from "./dto/token.dto";
import { ParticipantRepository } from "./participant.repository";
import { ParticipantService } from "./participant.service";

export default class ParticipantController implements Controller {
  path = "/participant";
  router = Router();

  participantService = new ParticipantService(new ParticipantRepository());

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

    req.session.email = participant.email;

    return {
      token,
      participant,
    };
  };

  readDocument: Handler = (req, res) => {
    throw new Error("Method not implemented.");
  };

  sign: Handler = (req, res) => {
    throw new Error("Method not implemented.");
  };
}
