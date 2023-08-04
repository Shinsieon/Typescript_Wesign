import { NotFoundException } from "../../common/exceptions";
import * as jwt from "../../lib/jwt";
import { ParticipantTokenDto } from "./dto/token.dto";
import { ParticipantJson } from "./entities/participant.entity";
import { ParticipantRepository } from "./participant.repository";

const DISABLE_STATUSES = Object.freeze(["CREATED", "DELETED"]);

export class ParticipantService {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  issueAccessToken({
    documentId,
    email,
  }: ParticipantTokenDto): [string, ParticipantJson] {
    const participant = this.participantRepository.findByDocumentIdAndEmail(
      documentId,
      email
    );

    if (!participant || DISABLE_STATUSES.includes(participant.status)) {
      throw new NotFoundException("참가자 정보를 찾을 수 없습니다.");
    }

    const token = jwt.sign({
      participant_id: participant.id,
      email: participant.email,
    });

    return [token, participant.toJson()];
  }
}
