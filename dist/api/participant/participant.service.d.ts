import { ParticipantTokenDto } from "./dto/token.dto";
import { ParticipantJson } from "./entities/participant.entity";
import { ParticipantRepository } from "./participant.repository";
export declare class ParticipantService {
    private readonly participantRepository;
    constructor(participantRepository: ParticipantRepository);
    issueAccessToken({ documentId, email, }: ParticipantTokenDto): [string, ParticipantJson];
}
