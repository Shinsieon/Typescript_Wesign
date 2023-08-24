"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantService = void 0;
const exceptions_1 = require("../../common/exceptions");
const jwt = __importStar(require("../../lib/jwt"));
const uuid_1 = require("uuid");
const DISABLE_STATUSES = Object.freeze(["CREATED", "DELETED"]);
class ParticipantService {
    constructor(participantRepository) {
        this.participantRepository = participantRepository;
    }
    issueAccessToken({ documentId, email, }) {
        const participant = this.participantRepository.findByDocumentIdAndEmail(documentId, email);
        if (!participant || DISABLE_STATUSES.includes(participant.status)) {
            throw new exceptions_1.NotFoundException("참가자 정보를 찾을 수 없습니다.");
        }
        const token = jwt.sign({
            participant_id: participant.id,
            email: participant.email,
        });
        return [token, participant.toJson()];
    }
    createParticipant(participants, document_id) {
        const now = new Date().toISOString();
        const participants_ = participants.map((participant) => {
            const id = uuid_1.v4();
            const { name, email } = participant;
            const status = "CREATED";
            const signature = "";
            const created_at = now;
            const updated_at = now;
            return {
                id,
                document_id,
                name,
                email,
                status,
                signature,
                created_at,
                updated_at,
            };
        });
        this.participantRepository.create(participants_);
        return;
    }
    findByDocumentIdAndEmail(documentId, email) {
        return this.participantRepository.findByDocumentIdAndEmail(documentId, email);
    }
    findByEmail(email) {
        return this.participantRepository.findByEmail(email);
    }
    findByDocumentId(documentId) {
        let participants_ = [];
        const participants = this.participantRepository.findByDocumentId(documentId);
        for (let i = 0; i < participants.length; i++) {
            const _a = participants[i], { signature } = _a, rest = __rest(_a, ["signature"]);
            participants_.push(rest);
        }
        return participants_;
    }
    async removeByDocumentId(documentId) {
        const result = await this.participantRepository.remove(documentId);
        return result;
    }
    async publishByDocumentId(documentId) {
        const result = await this.participantRepository.publish(documentId);
        return result;
    }
    async sign(email) {
        const result = await this.participantRepository.sign(email);
        return result;
    }
}
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=participant.service.js.map