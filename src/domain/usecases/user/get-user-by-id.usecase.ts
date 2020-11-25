import { UserEntity } from '@/domain/entities'

export interface GetUserByIdUseCase {
  call: (id: UserEntity['id']) => Promise<UserEntity | null>
}