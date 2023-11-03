
import { FastifyReply, FastifyRequest} from 'fastify'
import {z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function register(req : FastifyRequest, reply : FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })
    const { name, email, password } = registerBodySchema.parse(req.body)

   try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUsecase = new RegisterUseCase(prismaUsersRepository)

    await registerUsecase.execute({name, email, password})
   } catch (error) {
    return reply.status(409).send()
   }
   return reply.status(201).send()
}