import { expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already.exists-error'
import { beforeEach } from 'node:test'


// const usersRepository = new InMemoryUsersRepository()
// const registerUseCase = new RegisterUseCase(usersRepository)

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', ()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })


    it('should be able to register', async ()=>{    
        const{user} = await sut.execute({
            name: "john doe",
            email: 'johndoe@example.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async ()=>{
        const{user} = await sut.execute({
            name: "john doe",
            email: 'johndoe@example.com',
            password:'123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async ()=>{
        const email = 'johndoe@example.com';

        const{user} = await sut.execute({
            name: "john doe",
            email,
            password:'123456'
        })

        //resolve / reject
       await expect(()=>
       sut.execute({
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