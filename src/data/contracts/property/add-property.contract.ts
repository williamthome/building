// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddPropertyRepository } from '@/data/repositories'
// < Only Domain
import { Property, Company, CreatePropertyDto } from '@/domain/entities'
import { AddPropertyUseCase } from '@/domain/usecases'

@Injectable('addPropertyUseCase')
export class AddPropertyContract implements AddPropertyUseCase {

  constructor (
    @Inject() private readonly addPropertyRepository: AddPropertyRepository
  ) { }

  call = async (dto: CreatePropertyDto, companyId: Company['id']): Promise<Property> => {
    return await this.addPropertyRepository.addProperty({
      ...dto,
      companyId
    })
  }
}