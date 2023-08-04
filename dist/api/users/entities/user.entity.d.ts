import { Email, ISODatetime, Name, Password, UUID } from "../../../@types/datatype";
export interface UserRaw {
    readonly id: UUID;
    readonly email: Email;
    readonly name: Name;
    readonly password: Password;
    readonly created_at: ISODatetime;
    readonly updated_at: ISODatetime;
}
export declare class User {
    readonly id: UUID;
    readonly email: Email;
    readonly name: Name;
    readonly password: Password;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: UUID, email: Email, name: Name, password: Password, createdAt: Date, updatedAt: Date);
    static fromJson(json: UserRaw): User;
    toJson(): UserJson;
}
export interface UserJson {
    readonly id: UUID;
    readonly email: Email;
    readonly name: Name;
    readonly createdAt: ISODatetime;
    readonly updatedAt: ISODatetime;
}
