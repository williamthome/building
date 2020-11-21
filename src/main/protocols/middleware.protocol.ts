import { HttpRequest, HttpResponse } from '../../presentation/protocols/http.protocol'
import { LoggedUserInfo } from '../../presentation/protocols/logged-user-info.protocol'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse<LoggedUserInfo | Error>>
}