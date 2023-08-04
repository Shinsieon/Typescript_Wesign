"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
class Document {
    constructor(id, user_id, title, content, status, created_at, updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    static fromJson(json) {
        if (!json)
            return null;
        return new Document(json.id, json.user_id, json.title, json.content, json.status, new Date(json.created_at), new Date(json.updated_at));
    }
    toJson() {
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
exports.Document = Document;
//# sourceMappingURL=document.entity.js.map