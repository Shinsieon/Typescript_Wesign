import { DocumentDto } from "./dto/document.dto";
import { DocumentRepository } from "./document.repository";
export declare class DocumentService {
    private readonly documentRepository;
    constructor(documentRepository: DocumentRepository);
    createDocument({ title, content, participants }: DocumentDto): string;
}
