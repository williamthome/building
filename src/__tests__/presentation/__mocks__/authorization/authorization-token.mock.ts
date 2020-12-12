import { User } from '@/domain/entities'

export const mockAuthorizationToken = (accessToken: User['accessToken']): string => `Bearer ${accessToken}`