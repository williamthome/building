import { UnverifiedModel } from '@/data/models'
import { UnverifiedModelDto } from '@/data/protocols'
import { AddUnverifiedRepository } from '@/data/repositories'
import { mockUnverifiedModel } from '@/__tests__/data/__mocks__/models'

export class AddUnverifiedRepositorySpy implements AddUnverifiedRepository {
  unverifiedDto?:  UnverifiedModelDto
  unverifiedModel?: UnverifiedModel
  shouldThrow = false

  addUnverified = async (unverifiedDto: UnverifiedModelDto): Promise<UnverifiedModel> => {
    this.unverifiedDto = unverifiedDto

    if (this.shouldThrow) throw new Error()

    this.unverifiedModel = mockUnverifiedModel(unverifiedDto)
    return this.unverifiedModel
  }
}