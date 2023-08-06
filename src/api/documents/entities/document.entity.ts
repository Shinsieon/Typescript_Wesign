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
export interface DocumentHistoryRaw {
  readonly document_id: UUID;
  readonly type: string;
  readonly data: string;
  readonly created_at: ISODatetime;
}

export class Document {
  constructor(
    public readonly id: UUID,
    public readonly user_id: Email,
    public readonly title: string,
    public readonly content: string,
    public readonly status: string,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}

  public static fromJson(json: DocumentRaw) {
    if (!json) return null;
    return new Document(
      json.id,
      json.user_id,
      json.title,
      json.content,
      json.status,
      new Date(json.created_at),
      new Date(json.updated_at)
    );
  }

  public toJson(): DocumentJson {
    return {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      content: this.content,
      status: this.status,
      createdAt: this.created_at.toISOString(),
      updatedAt: this.updated_at.toISOString(),
    };
  }
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
