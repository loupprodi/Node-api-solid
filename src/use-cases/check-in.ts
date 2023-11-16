import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";

import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-0f-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";
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
        userlatitude,
        userlongitude
    }: CheckInUseCaseRequestI): Promise<CheckInUseCaseResponseI>{
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        //calculate distance between user and gym
        const distance = getDistanceBetweenCoordinates(
            {latitude: userlatitude, longitude: userlongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }


        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay){
            throw new MaxNumberOfCheckInsError()
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