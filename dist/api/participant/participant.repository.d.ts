import { Email, UUID } from "../../@types/datatype";
import { Repository } from "../../common/interfaces/repository.interface";
import { Participant, ParticipantRaw } from "./entities/participant.entity";
export declare class ParticipantRepository implements Repository {
    readonly tableName = "participants";
    findById(id: UUID): Participant;
    findByDocumentId(document_id: UUID): ParticipantRaw[];
    findByEmail(email: Email): Participant;
    findByDocumentIdAndEmail(documentId: UUID, email: Email): Participant;
    create(participants: ParticipantRaw[]): void;
    remove(document_id: UUID): boolean;
    publish(document_id: UUID): boolean;
    sign(email: Email): boolean;
}
