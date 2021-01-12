import { User } from '@/domain/entities'
import { GetUserByEmailUseCase } from '@/domain/usecases'
import { mockUser } from '@/__tests__/domain/__mocks__/entities'

export class GetUserByEmailUseCaseSpy implements GetUserByEmailUseCase {
  email?: User['email']
  user?: User | null
  override?: Partial<User>
  shouldReturnNull = false
  shouldThrow = false

  call = async (email: User['email']): Promise<User | null> => {
    this.email = email

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull ? null : { ...mockUser(), email, ...this.override }

    return this.user
  }
}
