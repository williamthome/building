import { CreateUserData, UserData } from '@/data/models'
import { AddUserRepository } from '@/data/repositories'
import { mockUserData } from '@/__tests__/data/__mocks__/models'

export class AddUserRepositorySpy implements AddUserRepository {
  dto?: CreateUserData
  user?: UserData
  shouldThrow = false

  addUser = async (dto: CreateUserData): Promise<UserData> => {
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.user = mockUserData(dto)
    return this.user
  }
}