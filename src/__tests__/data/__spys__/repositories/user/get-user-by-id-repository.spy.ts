import { UserData } from '@/data/models'
import { GetUserByIdRepository } from '@/data/repositories'
import { mockUserData } from '@/__tests__/data/__mocks__/models'

export class GetUserByIdRepositorySpy implements GetUserByIdRepository {
  id?: UserData['id']
  user?: UserData | null
  override?: Partial<UserData>
  shouldReturnNull = false
  shouldThrow = false

  getUserById = async (id: UserData['id']): Promise<UserData | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull
      ? null
      : { ...mockUserData(), id, ...this.override }

    return this.user
  }
}