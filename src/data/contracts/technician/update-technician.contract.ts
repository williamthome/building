// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateTechnicianRepository } from '@/data/repositories'
// < Only Domain
import { TechnicianEntity } from '@/domain/entities'
import { UpdateTechnicianUseCase } from '@/domain/usecases'
import { TechnicianEntityDto } from '@/domain/protocols'

@Injectable('updateTechnicianUseCase')
export class UpdateTechnicianContract implements UpdateTechnicianUseCase {

  constructor (
    @Inject() private readonly updateTechnicianRepository: UpdateTechnicianRepository
  ) {}

  call = async (id: TechnicianEntity['id'], dto: TechnicianEntityDto): Promise<TechnicianEntity | null> => {
    return await this.updateTechnicianRepository.updateTechnician(id, dto)
  }
}