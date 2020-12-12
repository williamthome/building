// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { AddTechnicianRepository } from '@/data/repositories'
// < Only Domain
import { Technician, Company, CreateTechnicianDto } from '@/domain/entities'
import { AddTechnicianUseCase } from '@/domain/usecases'

@Injectable('addTechnicianUseCase')
export class AddTechnicianContract implements AddTechnicianUseCase {

  constructor (
    @Inject() private readonly addTechnicianRepository: AddTechnicianRepository
  ) { }

  call = async (dto: CreateTechnicianDto, companyId: Company['id']): Promise<Technician> => {
    return await this.addTechnicianRepository.addTechnician({
      ...dto,
      companyId
    })
  }
}