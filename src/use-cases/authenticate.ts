import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequestI {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponseI {
    user: User;
}

export class AuthenticateUseCase {
    constructor(
        private userRepository : UsersRepository
    ){}

    async execute({ email, password}: AuthenticateUseCaseRequestI): Promise<AuthenticateUseCaseResponseI>{
     const user = await this.userRepository.findByEmail(email)

     if(!user){
        throw new InvalidCredentialsError()
     }

     //boolean => "is" "has" "does"
     const doesPasswordMatches = await compare(password, user.password_hash)
     if(!doesPasswordMatches){
        throw new InvalidCredentialsError()
     }

     return {
        user,
     }
    }
}