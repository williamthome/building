// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdatePropertyRepository } from '@/data/repositories'
// < Only Domain
import { Property, UpdatePropertyDto } from '@/domain/entities'
import { UpdatePropertyUseCase } from '@/domain/usecases'

@Injectable('updatePropertyUseCase')
export class UpdatePropertyContract implements UpdatePropertyUseCase {

  constructor (
    @Inject() private readonly updatePropertyRepository: UpdatePropertyRepository
  ) {}

  call = async (id: Property['id'], dto: UpdatePropertyDto): Promise<Property | null> => {
    return await this.updatePropertyRepository.updateProperty(id, dto)
  }
}