import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequestI {
    userId: string
}

interface GetUserProfileUseCaseResponseI {
    user: User;
}

export class GetUserProfileUseCase {
    constructor(
        private userRepository : UsersRepository
    ){}

    async execute({ userId}: GetUserProfileUseCaseRequestI): Promise<GetUserProfileUseCaseResponseI>{
     const user = await this.userRepository.findById(userId)

     if(!user){
        throw new ResourceNotFoundError()
     }
     
     return {
        user,
     }
    }
}