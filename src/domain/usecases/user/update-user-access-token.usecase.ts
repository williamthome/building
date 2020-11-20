import { UserEntity } from '@/domain/entities'

export interface UpdateUserAccessTokenUseCase {
  call: (
    id: UserEntity['id'],
    accessToken: UserEntity['accessToken']
  ) => Promise<void>
}