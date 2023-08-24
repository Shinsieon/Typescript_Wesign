import { UUID } from "../../../@types/datatype";
import { ParticipantInDoc } from "../../participant/entities/participant.entity";
export interface DocumentDto {
    title: string;
    content: string;
    participants: ParticipantInDoc[];
}
export declare type DocumentResponse = UUID;
