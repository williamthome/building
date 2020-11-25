import { UserModel } from '@/data/models'
import { GetUserByIdRepository } from '@/data/repositories'
import { mockUserModel } from '@/__tests__/data/__mocks__/models'

export class GetUserByIdRepositorySpy implements GetUserByIdRepository {
  id?: UserModel['id']
  userModel?: UserModel | null
  override?: Partial<UserModel>
  shouldReturnNull = false
  shouldThrow = false

  getUserById = async (id: UserModel['id']): Promise<UserModel | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.userModel = this.shouldReturnNull
      ? null
      : { ...mockUserModel(), id, ...this.override }

    return this.userModel
  }
}