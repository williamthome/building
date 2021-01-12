import { HttpRequest, HandleResponse } from '@/presentation/protocols'

export type MiddlewareContent = Pick<HttpRequest, 'loggedUserInfo' | 'activeCompanyInfo'>

export type MiddlewareResponse = HandleResponse<MiddlewareContent>

export interface Middleware {
  handle: <T>(httpRequest: HttpRequest<T>) => MiddlewareResponse
}
