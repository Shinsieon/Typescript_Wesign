import { Email, UUID } from "../../@types/datatype";
import { ParticipantTokenDto } from "./dto/token.dto";
import { Participant, ParticipantInDoc, ParticipantJson, ParticipantWithoutSign } from "./entities/participant.entity";
import { ParticipantRepository } from "./participant.repository";
export declare class ParticipantService {
    private readonly participantRepository;
    constructor(participantRepository: ParticipantRepository);
    issueAccessToken({ documentId, email, }: ParticipantTokenDto): [string, ParticipantJson];
    createParticipant(participants: ParticipantInDoc[], document_id: UUID): void;
    findByDocumentIdAndEmail(documentId: UUID, email: Email): Participant;
    findByEmail(email: Email): Participant;
    findByDocumentId(documentId: UUID): ParticipantWithoutSign[];
    removeByDocumentId(documentId: UUID): Promise<boolean>;
    publishByDocumentId(documentId: UUID): Promise<boolean>;
    sign(email: Email): Promise<boolean>;
}
