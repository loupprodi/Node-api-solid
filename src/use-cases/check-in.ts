import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequestI {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponseI {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository : CheckInsRepository){}

    async execute({ 
        userId,
        gymId,
    }: CheckInUseCaseRequestI): Promise<CheckInUseCaseResponseI>{
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