import { Email, ISODatetime, Name, UUID } from "../../../@types/datatype";
export interface ParticipantRaw {
    id: UUID;
    document_id: UUID;
    name: Name;
    email: Email;
    status: string;
    signature: string;
    created_at: ISODatetime;
    updated_at: ISODatetime;
}
export interface ParticipantInDoc {
    name: string;
    email: Email;
}
export declare class Participant {
    readonly id: UUID;
    readonly documentId: UUID;
    readonly name: Name;
    readonly email: Email;
    readonly status: string;
    readonly signature: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: UUID, documentId: UUID, name: Name, email: Email, status: string, signature: string, createdAt: Date, updatedAt: Date);
    static fromJson(json: ParticipantRaw): Participant;
    toJson(): ParticipantJson;
}
export interface ParticipantJson {
    readonly id: UUID;
    readonly documentId: UUID;
    readonly name: Name;
    readonly email: Email;
    readonly status: string;
    readonly createdAt: ISODatetime;
    readonly updatedAt: ISODatetime;
}
export declare type ParticipantWithoutSign = Omit<ParticipantRaw, "signature">;
