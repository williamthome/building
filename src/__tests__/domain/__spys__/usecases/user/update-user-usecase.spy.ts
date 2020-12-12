import { UpdateUserDto, User } from '@/domain/entities'
import { UpdateUserUseCase } from '@/domain/usecases'
import { mockUser } from '@/__tests__/domain/__mocks__/entities'

export class UpdateUserUseCaseSpy implements UpdateUserUseCase {
  id?: User['id']
  dto?: UpdateUserDto
  user?: User | null
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: User['id'], dto: UpdateUserDto): Promise<User | null> => {
    this.id = id
    this.dto = dto

    if (this.shouldThrow) throw new Error()

    this.user = this.shouldReturnNull
      ? null
      : mockUser(dto)

    return this.user
  }
}