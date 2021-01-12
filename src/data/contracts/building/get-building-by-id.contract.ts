// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetBuildingByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetBuildingByIdUseCase } from '@/domain/usecases'
import { Building } from '@/domain/entities'

@Injectable('getBuildingByIdUseCase')
export class GetBuildingByIdContract implements GetBuildingByIdUseCase {
  constructor(@Inject() private readonly getBuildingByIdRepository: GetBuildingByIdRepository) {}

  call = async (id: Building['id']): Promise<Building | null> => {
    return await this.getBuildingByIdRepository.getBuildingById(id)
  }
}
