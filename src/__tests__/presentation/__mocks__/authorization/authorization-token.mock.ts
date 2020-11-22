import { UserEntity } from '@/domain/entities'

export const mockAuthorizationToken = (
  accessToken: UserEntity['accessToken']
): string => `Bearer ${accessToken}`