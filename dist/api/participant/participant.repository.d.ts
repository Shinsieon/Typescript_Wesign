import { Email, UUID } from "../../@types/datatype";
import { Repository } from "../../common/interfaces/repository.interface";
import { Participant } from "./entities/participant.entity";
export declare class ParticipantRepository implements Repository {
    readonly tableName = "participants";
    findById(id: UUID): Participant;
    findByDocumentIdAndEmail(documentId: UUID, email: Email): Participant;
}
