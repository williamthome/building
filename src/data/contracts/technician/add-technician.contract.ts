// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddTechnicianRepository } from '@/data/repositories'
// < Only Domain
import { TechnicianEntity, CompanyEntity } from '@/domain/entities'
import { AddTechnicianUseCase } from '@/domain/usecases'
import { TechnicianEntityDto } from '@/domain/protocols'

@Injectable('addTechnicianUseCase')
export class AddTechnicianContract implements AddTechnicianUseCase {

  constructor (
    @Inject() private readonly addTechnicianRepository: AddTechnicianRepository
  ) { }

  call = async (
    dto: TechnicianEntityDto,
    companyId: CompanyEntity['id']
  ): Promise<TechnicianEntity> => {
    return await this.addTechnicianRepository.addTechnician({
      ...dto,
      companyId
    })
  }
}