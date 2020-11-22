import { HttpRequest, HandleResponse, LoggedUserInfo } from '@/presentation/protocols'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => HandleResponse<LoggedUserInfo>
}