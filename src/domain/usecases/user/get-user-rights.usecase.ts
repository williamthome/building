import { UserEntity } from '@/domain/entities'
import { UserRights } from '@/domain/protocols'

export interface GetUserRightsUseCase {
  call: (id: UserEntity['id']) => Promise<UserRights[]>
}