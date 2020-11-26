// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetBuildingByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetBuildingByIdUseCase } from '@/domain/usecases'
import { BuildingEntity } from '@/domain/entities'

@Injectable('getBuildingByIdUseCase')
export class GetBuildingByIdContract implements GetBuildingByIdUseCase {

  constructor (
    @Inject() private readonly getBuildingByIdRepository: GetBuildingByIdRepository
  ) {}

  call = async (id: BuildingEntity['id']): Promise<BuildingEntity | null> => {
    return await this.getBuildingByIdRepository.getBuildingById(id)
  }
}