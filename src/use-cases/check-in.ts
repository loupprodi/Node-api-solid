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
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })
        return{
            checkIn,
        }
    }
}