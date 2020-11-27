import { UserEntity } from '@/domain/entities'
import { UserEntityRights } from '@/domain/protocols'

export interface GetUserRightsUseCase {
  call: (id: UserEntity['id']) => Promise<UserEntityRights[]>
}