import { Email, UUID } from "../../@types/datatype";
import { NotFoundException } from "../../common/exceptions";
import * as jwt from "../../lib/jwt";
import { ParticipantTokenDto } from "./dto/token.dto";
import {
  Participant,
  ParticipantInDoc,
  ParticipantJson,
  ParticipantRaw,
  ParticipantWithoutSign,
} from "./entities/participant.entity";
import { ParticipantRepository } from "./participant.repository";
import { v4 as uuidv4 } from "uuid";

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
  createParticipant(participants: ParticipantInDoc[], document_id: UUID) {
    const now = new Date().toISOString();
    const participants_: ParticipantRaw[] = participants.map((participant) => {
      const id: UUID = uuidv4();
      const { name, email } = participant;
      const status = "CREATED";
      const signature = "";
      const created_at = now;
      const updated_at = now;
      return {
        id,
        document_id,
        name,
        email,
        status,
        signature,
        created_at,
        updated_at,
      };
    });
    this.participantRepository.create(participants_);
    return;
  }
  findByDocumentIdAndEmail(documentId: UUID, email: Email): Participant {
    return this.participantRepository.findByDocumentIdAndEmail(
      documentId,
      email
    );
  }
  findByEmail(email: Email): Participant {
    return this.participantRepository.findByEmail(email);
  }
  findByDocumentId(documentId: UUID): ParticipantWithoutSign[] {
    let participants_: ParticipantWithoutSign[] = [];
    const participants =
      this.participantRepository.findByDocumentId(documentId);
    for (let i = 0; i < participants.length; i++) {
      const { signature, ...rest } = participants[i];
      participants_.push(rest);
    }
    return participants_;
  }
  async removeByDocumentId(documentId: UUID): Promise<boolean> {
    const result = await this.participantRepository.remove(documentId);
    return result;
  }
  async publishByDocumentId(documentId: UUID): Promise<boolean> {
    const result = await this.participantRepository.publish(documentId);
    return result;
  }
  async sign(email: Email): Promise<boolean> {
    const result = await this.participantRepository.sign(email);
    return result;
  }
}
