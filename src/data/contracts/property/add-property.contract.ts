// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddPropertyRepository } from '@/data/repositories'
// < Only Domain
import { PropertyEntity, CompanyEntity } from '@/domain/entities'
import { AddPropertyUseCase } from '@/domain/usecases'
import { PropertyEntityDto } from '@/domain/protocols'

@Injectable('addPropertyUseCase')
export class AddPropertyContract implements AddPropertyUseCase {

  constructor (
    @Inject() private readonly addPropertyRepository: AddPropertyRepository
  ) { }

  call = async (
    dto: PropertyEntityDto,
    companyId: CompanyEntity['id']
  ): Promise<PropertyEntity> => {
    return await this.addPropertyRepository.addProperty({
      ...dto,
      companyId
    })
  }
}