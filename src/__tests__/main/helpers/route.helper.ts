import { UserEntity } from '@/domain/entities'

export const makeBearer = (accessToken: UserEntity['accessToken']): string =>
  `Bearer ${accessToken}`