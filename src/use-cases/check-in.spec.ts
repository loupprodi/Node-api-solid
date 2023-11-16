import { expect, describe, it, vi , afterEach, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

// const usersRepository = new InMemoryUsersRepository()
// const registerUseCase = new RegisterUseCase(usersRepository)
let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

     gymsRepository.items.push({
      id:'gym-01',
      title:'Javascript Gym',
      description: '',
      phone:'',
      latitude: new Decimal(-23.5131824),
      longitude: new Decimal(-47.458847),

    })

    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userlatitude: -23.5131824,
      userlongitude: -47.458847,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0 , 20, 8, 0, 0))

    await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userlatitude: -23.5131824,
      userlongitude: -47.458847,
    })

    await expect(()=> sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userlatitude: -23.5131824,
      userlongitude: -47.458847,
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0 , 20, 8, 0, 0))

    await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userlatitude: -23.5131824,
      userlongitude: -47.458847,
    })

    vi.setSystemTime(new Date(2023, 0 , 21, 8, 0, 0))


   const {checkIn} = await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userlatitude: -23.5131824,
      userlongitude: -47.458847,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })


  it('should not be able to check in on distant gynm', async () => {
    gymsRepository.items.push({
      id:'gym-02',
      title:'Javascript Gym',
      description: '',
      phone:'',
      latitude: new Decimal(-23.4890354),
      longitude: new Decimal(-47.3660465),
    })

    await expect(()=>
       sut.execute({
        gymId:'gym-02',
        userId:'user-02',
        userlatitude: -24.5131824,
        userlongitude: -48.458847,
      })).toEqual(expect.any(String))
  })

})