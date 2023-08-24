import { DocumentResponse } from "./dto/document.dto";
import { DocumentRepository } from "./document.repository";
import { UUID } from "../../@types/datatype";
import { DocumentRaw } from "./entities/document.entity";
export declare class DocumentService {
    private readonly documentRepository;
    constructor(documentRepository: DocumentRepository);
    createDocument({ user_id, title, content }: {
        user_id: any;
        title: any;
        content: any;
    }): DocumentResponse;
    readDocument(id: UUID): DocumentRaw;
    removeDocument(id: UUID): Promise<boolean>;
    publishDocument(id: UUID): Promise<boolean>;
    readAllDocument(): DocumentRaw[];
}
