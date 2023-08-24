import { Email, ISODatetime, UUID } from "../../../@types/datatype";
import { ParticipantWithoutSign } from "../../participant/entities/participant.entity";
export interface DocumentRaw {
    readonly id: UUID;
    readonly user_id: Email;
    readonly title: string;
    readonly content: string;
    readonly status: string;
    readonly created_at: ISODatetime;
    readonly updated_at: ISODatetime;
}
export interface DocumentHistoryRaw {
    readonly document_id: UUID;
    readonly type: string;
    readonly data: string;
    readonly created_at: ISODatetime;
}
export declare class Document {
    readonly id: UUID;
    readonly user_id: Email;
    readonly title: string;
    readonly content: string;
    readonly status: string;
    readonly created_at: Date;
    readonly updated_at: Date;
    constructor(id: UUID, user_id: Email, title: string, content: string, status: string, created_at: Date, updated_at: Date);
    static fromJson(json: DocumentRaw): Document;
    toJson(): DocumentJson;
}
export interface DocumentJson {
    readonly id: UUID;
    readonly user_id: Email;
    readonly title: string;
    readonly content: string;
    readonly status: string;
    readonly createdAt: ISODatetime;
    readonly updatedAt: ISODatetime;
}
export interface DocumentWithParticipants extends DocumentRaw {
    participants?: ParticipantWithoutSign[];
}
