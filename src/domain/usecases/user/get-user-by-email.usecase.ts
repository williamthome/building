import { UserEntity } from '@/domain/entities'

export interface GetUserByEmailUseCase {
  call: (email: UserEntity['email']) => Promise<UserEntity | null>
}