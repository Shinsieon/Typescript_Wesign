import { UUID } from "../../@types/datatype";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";
import { UserJson } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findById(id: string): import("./entities/user.entity").User;
    findByEmail(email: string): import("./entities/user.entity").User;
    countByEmail(email: string): import("../../common/interfaces/database-result").CountResult;
    signUp({ name, email, password }: SignUpDto): Promise<UUID>;
    login({ email, password }: LoginDto): Promise<[string, UserJson]>;
}
