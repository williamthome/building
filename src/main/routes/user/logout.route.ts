import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { LogoutController } from '@/presentation/controllers'
import { UserResponse } from '@/domain/protocols'
import { User } from '@/domain/entities'

export const LogoutPath = new RoutePath('POST', '/logout')

@InjectableRoute(LogoutPath)
export class LogoutRoute implements Route<Pick<User, 'accessToken'>, UserResponse> {
  constructor(
    @InjectRouteController(LogoutController)
    public readonly controller: LogoutController
  ) {}

  get middlewares(): Middleware[] {
    return []
  }
}
