import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequestI{
    name: string,
    email: string,
    password:string
}

//SOLID -
// D- Dependecy Inversion principle
export class RegisterUseCase{
    constructor(private usersRepository: any ){}

   async execute({name, email, password}: RegisterUseCaseRequestI){
        const password_hash = await hash(password, 6)
    
        const userWithSameEmail = await prisma.user.findUnique({
            where:{
                email,
            }
        })
    
        if(userWithSameEmail){
            throw new Error("Email already exist. ")
        }
        // const prismaUsersRepository = new PrismaUsersRepository()
    
        await this.usersRepository.create({
            name, email, password_hash
        })
    }
}

