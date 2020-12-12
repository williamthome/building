import { UpdateUserDto, User } from '@/domain/entities'

export interface UpdateUserUseCase {
  call: (id: User['id'], dto: UpdateUserDto) => Promise<User | null>
}