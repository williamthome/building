import { User } from '@/domain/entities'

export interface GetUserByEmailUseCase {
  call: (email: User['email']) => Promise<User | null>
}
