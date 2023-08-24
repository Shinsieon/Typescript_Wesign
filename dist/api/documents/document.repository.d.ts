import { Repository } from "../../common/interfaces/repository.interface";
import { UUID } from "../../@types/datatype";
import { DocumentHistoryRaw, DocumentRaw } from "./entities/document.entity";
export declare class DocumentRepository implements Repository {
    tableName: string;
    create(raw: DocumentRaw): void;
    select(id: UUID): DocumentRaw;
    selectAll(): DocumentRaw[];
    save_history(raw: DocumentHistoryRaw): void;
    remove(document_id: UUID): boolean;
    publish(document_id: UUID): boolean;
}
