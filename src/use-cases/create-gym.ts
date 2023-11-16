import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseRequestI{
    title: string
    description: string |null
    phone:string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponseI {
    gym: Gym
}

//SOLID -
// D- Dependecy Inversion principle
export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}
  
    async execute({
      title,
      description,
      phone,
      latitude,
      longitude
    }: CreateGymUseCaseRequestI): Promise<CreateGymUseCaseResponseI> {
      const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
      })
  
      return {
        gym,
      }
    }
  }

