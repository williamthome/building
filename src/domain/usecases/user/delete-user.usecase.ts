import { User } from '@/domain/entities'

export interface DeleteUserUseCase {
  call: (id: User['id']) => Promise<User | null>
}