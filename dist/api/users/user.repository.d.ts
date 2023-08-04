/// <reference types="better-sqlite3" />
import { CountResult } from "../../common/interfaces/database-result";
import { Email, UUID } from "../../@types/datatype";
import { User, UserRaw } from "./entities/user.entity";
import { Repository } from "../../common/interfaces/repository.interface";
export declare class UserRepository implements Repository {
    tableName: string;
    findById(id: UUID): User;
    findByEmail(email: Email): User;
    countByEmail(email: Email): CountResult;
    create(raw: UserRaw): import("better-sqlite3").RunResult;
}
