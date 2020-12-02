// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetTechnicianByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetTechnicianByIdUseCase } from '@/domain/usecases'
import { TechnicianEntity } from '@/domain/entities'

@Injectable('getTechnicianByIdUseCase')
export class GetTechnicianByIdContract implements GetTechnicianByIdUseCase {

  constructor (
    @Inject() private readonly getTechnicianByIdRepository: GetTechnicianByIdRepository
  ) {}

  call = async (id: TechnicianEntity['id']): Promise<TechnicianEntity | null> => {
    return await this.getTechnicianByIdRepository.getTechnicianById(id)
  }
}