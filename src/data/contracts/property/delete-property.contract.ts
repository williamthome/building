// : Shared
import { Injectable, Inject } from '@/shared/dependency-injection'
// > Data
import { DeletePropertyRepository } from '@/data/repositories'
// < Only Domain
import { PropertyEntity } from '@/domain/entities'
import { DeletePropertyUseCase } from '@/domain/usecases'

@Injectable('deletePropertyUseCase')
export class DeletePropertyContract implements DeletePropertyUseCase {

  constructor (
    @Inject() private readonly deletePropertyRepository: DeletePropertyRepository
  ) {}

  call = async (id: PropertyEntity['id']): Promise<PropertyEntity | null> => {
    const deletedProperty = await this.deletePropertyRepository.deleteProperty(id)
    if (!deletedProperty) return null
    return deletedProperty
  }
}