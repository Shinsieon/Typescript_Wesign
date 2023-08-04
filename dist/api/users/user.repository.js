"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../../lib/database");
const user_entity_1 = require("./entities/user.entity");
class UserRepository {
    constructor() {
        this.tableName = "users";
    }
    findById(id) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
            .get(id);
        return user_entity_1.User.fromJson(raw);
    }
    findByEmail(email) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`)
            .get(email);
        return user_entity_1.User.fromJson(raw);
    }
    countByEmail(email) {
        const result = database_1.db
            .prepare(`SELECT COUNT(*) as count FROM ${this.tableName} WHERE email = ?`)
            .get(email);
        return result;
    }
    create(raw) {
        const result = database_1.db
            .prepare([
            "INSERT INTO",
            this.tableName,
            "(id, email, name, password, created_at, updated_at)",
            "VALUES",
            "($id, $email, $name, $password, $created_at, $updated_at)",
        ].join(" "))
            .run(raw);
        return result;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map