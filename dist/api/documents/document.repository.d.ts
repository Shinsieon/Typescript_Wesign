/// <reference types="better-sqlite3" />
import { DocumentRaw } from "./entities/document.entity";
import { Repository } from "../../common/interfaces/repository.interface";
export declare class DocumentRepository implements Repository {
    tableName: string;
    create(raw: DocumentRaw): import("better-sqlite3").RunResult;
}
