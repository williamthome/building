import { UserEntity } from '@/domain/entities'

export interface DeleteUserUseCase {
  call: (userId: UserEntity['id']) => Promise<UserEntity | null>
}