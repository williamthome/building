import { UpdateUserData, UserData } from '@/data/models'
import { UpdateUserRepository } from '@/data/repositories'
import { mockUserData } from '@/__tests__/data/__mocks__/models'

export class UpdateUserRepositorySpy implements UpdateUserRepository {
  id?: UserData['id']
  dto?: UpdateUserData
  user?: UserData | null
  shouldReturnNull = false
  shouldThrow = false

  updateUser = async (id: UserData['id'], dto: UpdateUserData): Promise<UserData | null> => {
    this.id = id
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull ? null : mockUserData(dto)

    return this.user
  }
}
