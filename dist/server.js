"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_controller_1 = __importDefault(require("./api/documents/document.controller"));
const participant_controller_1 = __importDefault(require("./api/participant/participant.controller"));
const user_controller_1 = __importDefault(require("./api/users/user.controller"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./lib/database");
async function startServer() {
    await database_1.initializeDatabase(":memory:");
    const app = new app_1.default([
        new user_controller_1.default(),
        new participant_controller_1.default(),
        new document_controller_1.default(),
    ]);
    app.listen();
}
startServer();
//# sourceMappingURL=server.js.map