import { User, UserRights } from '@/domain/entities'
export interface GetUserRightsUseCase {
  call: (id: User['id']) => Promise<UserRights[]>
}