import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequestI {
    userId: string
    gymId: string
    userlatitude: number
    userlongitude: number
}

interface CheckInUseCaseResponseI {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository : CheckInsRepository,
        private gymsRepository : GymsRepository    
    ){}
    async execute({ 
        userId,
        gymId,
    }: CheckInUseCaseRequestI): Promise<CheckInUseCaseResponseI>{
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        //calculate distance between user and gym

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })
        return{
            checkIn,
        }
    }
}