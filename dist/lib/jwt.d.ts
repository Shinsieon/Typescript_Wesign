import * as jwt from "jsonwebtoken";
export declare type JwtPayload = JwtPayloadOfUser | JwtPayloadOfParticipant;
export interface JwtDefaultPayload {
    email: string;
}
export interface JwtPayloadOfParticipant extends JwtDefaultPayload {
    participant_id: string;
}
export interface JwtPayloadOfUser extends JwtDefaultPayload {
    user_id: string;
}
export declare function sign(payload: JwtPayload, options?: jwt.SignOptions): string;
export declare function verify(token: string, options?: jwt.VerifyOptions): JwtPayload;
