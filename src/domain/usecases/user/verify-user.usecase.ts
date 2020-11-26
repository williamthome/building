import { UserEntity } from '@/domain/entities'

export interface VerifyUserUseCase {
  call: (id: UserEntity['id']) => Promise<UserEntity | null>
}