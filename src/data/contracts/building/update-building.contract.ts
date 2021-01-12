// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateBuildingRepository } from '@/data/repositories'
// < Only Domain
import { Building, UpdateBuildingDto } from '@/domain/entities'
import { UpdateBuildingUseCase } from '@/domain/usecases'

@Injectable('updateBuildingUseCase')
export class UpdateBuildingContract implements UpdateBuildingUseCase {
  constructor(@Inject() private readonly updateBuildingRepository: UpdateBuildingRepository) {}

  call = async (id: Building['id'], dto: UpdateBuildingDto): Promise<Building | null> => {
    return await this.updateBuildingRepository.updateBuilding(id, dto)
  }
}
