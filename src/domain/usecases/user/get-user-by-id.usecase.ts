import { User } from '@/domain/entities'

export interface GetUserByIdUseCase {
  call: (id: User['id']) => Promise<User | null>
}
