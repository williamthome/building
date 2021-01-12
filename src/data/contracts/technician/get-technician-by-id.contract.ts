// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetTechnicianByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetTechnicianByIdUseCase } from '@/domain/usecases'
import { Technician } from '@/domain/entities'

@Injectable('getTechnicianByIdUseCase')
export class GetTechnicianByIdContract implements GetTechnicianByIdUseCase {
  constructor(
    @Inject() private readonly getTechnicianByIdRepository: GetTechnicianByIdRepository
  ) {}

  call = async (id: Technician['id']): Promise<Technician | null> => {
    return await this.getTechnicianByIdRepository.getTechnicianById(id)
  }
}
