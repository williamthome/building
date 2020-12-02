// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdatePropertyRepository } from '@/data/repositories'
// < Only Domain
import { PropertyEntity } from '@/domain/entities'
import { UpdatePropertyUseCase } from '@/domain/usecases'
import { PropertyEntityDto } from '@/domain/protocols'

@Injectable('updatePropertyUseCase')
export class UpdatePropertyContract implements UpdatePropertyUseCase {

  constructor (
    @Inject() private readonly updatePropertyRepository: UpdatePropertyRepository
  ) {}

  call = async (id: PropertyEntity['id'], dto: PropertyEntityDto): Promise<PropertyEntity | null> => {
    return await this.updatePropertyRepository.updateProperty(id, dto)
  }
}