import { CreateUnverifiedData, UnverifiedData } from '@/data/models'
import { AddUnverifiedRepository } from '@/data/repositories'
import { mockUnverifiedData } from '@/__tests__/data/__mocks__/models'

export class AddUnverifiedRepositorySpy implements AddUnverifiedRepository {
  dto?: CreateUnverifiedData
  unverified?: UnverifiedData
  shouldThrow = false

  addUnverified = async (dto: CreateUnverifiedData): Promise<UnverifiedData> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.unverified = mockUnverifiedData(dto)
    return this.unverified
  }
}
