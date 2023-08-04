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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantService = void 0;
const exceptions_1 = require("../../common/exceptions");
const jwt = __importStar(require("../../lib/jwt"));
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
}
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=participant.service.js.map