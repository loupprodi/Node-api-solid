import { expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach } from 'node:test'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

// const usersRepository = new InMemoryUsersRepository()
// const registerUseCase = new RegisterUseCase(usersRepository)
let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript gym',
      description: null,
      phone: null,
      latitude: -23.5131824,
      longitude: -47.458847,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})