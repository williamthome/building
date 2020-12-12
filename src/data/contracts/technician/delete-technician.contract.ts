// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeleteTechnicianRepository } from '@/data/repositories'
// < Only Domain
import { Technician } from '@/domain/entities'
import { DeleteTechnicianUseCase } from '@/domain/usecases'

@Injectable('deleteTechnicianUseCase')
export class DeleteTechnicianContract implements DeleteTechnicianUseCase {

  constructor (
    @Inject() private readonly deleteTechnicianRepository: DeleteTechnicianRepository
  ) {}

  call = async (id: Technician['id']): Promise<Technician | null> => {
    const deletedTechnician = await this.deleteTechnicianRepository.deleteTechnician(id)
    if (!deletedTechnician) return null
    return deletedTechnician
  }
}