// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > Data
import { GetPropertyByIdRepository } from '@/data/repositories'
// < Only Domain
import { GetPropertyByIdUseCase } from '@/domain/usecases'
import { Property } from '@/domain/entities'

@Injectable('getPropertyByIdUseCase')
export class GetPropertyByIdContract implements GetPropertyByIdUseCase {

  constructor (
    @Inject() private readonly getPropertyByIdRepository: GetPropertyByIdRepository
  ) {}

  call = async (id: Property['id']): Promise<Property | null> => {
    return await this.getPropertyByIdRepository.getPropertyById(id)
  }
}