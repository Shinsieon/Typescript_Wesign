"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction = exports.closeDatabase = exports.initializeDatabase = exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
async function initializeDatabase(filename, options) {
    exports.db = new better_sqlite3_1.default(filename, options);
    const schema = fs_1.default.readFileSync("schema.sql").toString("utf-8");
    exports.db.exec(schema);
}
exports.initializeDatabase = initializeDatabase;
async function closeDatabase() {
    exports.db === null || exports.db === void 0 ? void 0 : exports.db.close();
}
exports.closeDatabase = closeDatabase;
function transaction(cb) {
    let result;
    exports.db.transaction(() => {
        result = cb();
    })();
    return result;
}
exports.transaction = transaction;
//# sourceMappingURL=database.js.map