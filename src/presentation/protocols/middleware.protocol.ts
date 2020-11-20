import { HttpRequest, HttpResponse } from './http.protocol'
import { LoggedUserInfo } from './logged-user-info.protocol'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse<LoggedUserInfo | Error>>
}