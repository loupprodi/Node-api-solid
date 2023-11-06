import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already.exists-error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequestI{
    name: string,
    email: string,
    password:string
}

interface RegisterUseCaseResponseI {
    user: User
}

//SOLID -
// D- Dependecy Inversion principle
export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository ){}

   async execute({name, email, password}: RegisterUseCaseRequestI): Promise<RegisterUseCaseResponseI>{
        const password_hash = await hash(password, 6)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
        // const prismaUsersRepository = new PrismaUsersRepository()
    
       const user = await this.usersRepository.create({name, email, password_hash})

       return {
        user,
    }
    }
}

