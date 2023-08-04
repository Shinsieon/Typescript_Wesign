import { Email, ISODatetime, UUID } from "../../../@types/datatype";
export interface DocumentRaw {
    readonly id: UUID;
    readonly user_id: Email;
    readonly title: string;
    readonly content: string;
    readonly status: string;
    readonly created_at: ISODatetime;
    readonly updated_at: ISODatetime;
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
    readonly user_id: string;
    readonly title: string;
    readonly content: string;
    readonly status: string;
    readonly createdAt: ISODatetime;
    readonly updatedAt: ISODatetime;
}
