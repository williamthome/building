// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { UpdateTechnicianRepository } from '@/data/repositories'
// < Only Domain
import { Technician, UpdateTechnicianDto } from '@/domain/entities'
import { UpdateTechnicianUseCase } from '@/domain/usecases'

@Injectable('updateTechnicianUseCase')
export class UpdateTechnicianContract implements UpdateTechnicianUseCase {

  constructor (
    @Inject() private readonly updateTechnicianRepository: UpdateTechnicianRepository
  ) {}

  call = async (id: Technician['id'], dto: UpdateTechnicianDto): Promise<Technician | null> => {
    return await this.updateTechnicianRepository.updateTechnician(id, dto)
  }
}