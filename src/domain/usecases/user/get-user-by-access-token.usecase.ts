import { UserEntity } from '@/domain/entities'

export interface GetUserByAccessTokenUseCase {
  call: (accessToken: UserEntity['accessToken']) => Promise<UserEntity | null>
}