import { Email, UUID } from "../../../@types/datatype";

export interface DocumentDto {
  title: string;
  content: string;
  participants: [{ name: string; email: Email }];
}

export interface DocumentResponse {
  documentId: UUID;
}
