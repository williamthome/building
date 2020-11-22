import { UserEntity } from '@/domain/entities'
import { HttpHeaderName } from '@/presentation/constants'
import { HttpHeaders } from '@/presentation/protocols'
import { mockAuthorizationToken } from './authorization-token.mock'

export const mockAuthorizationHeader = (accessToken: UserEntity['accessToken']): HttpHeaders => ({
  [HttpHeaderName.AUTHORIZATION]: accessToken ? mockAuthorizationToken(accessToken) : undefined
})