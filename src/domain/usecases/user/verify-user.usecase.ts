import { User } from '@/domain/entities'

export interface VerifyUserUseCase {
  call: (id: User['id']) => Promise<User | null>
}
