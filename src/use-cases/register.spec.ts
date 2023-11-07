import { expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already.exists-error'

describe('Register Use Case', ()=>{
    it('should hash user password upon registration', async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)


        const{user} = await registerUseCase.execute({
            name: "john doe",
            email: 'johndoe@example.com',
            password:'123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async ()=>{
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe@example.com';

        const{user} = await registerUseCase.execute({
            name: "john doe",
            email,
            password:'123456'
        })

        //resolve / reject
        expect(()=>
            registerUseCase.execute({
                name: "john doe",
                email,
                password:'123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

        return { 
            user
         }
    })
})