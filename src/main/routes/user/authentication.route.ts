import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AuthenticationController } from '@/presentation/controllers'
import { UserResponse } from '@/domain/protocols'
import { Authentication } from '@/domain/entities'

export const authenticationPath = new RoutePath('POST', '/login')

@InjectableRoute(authenticationPath)
export class AuthenticationRoute implements Route<Authentication, UserResponse> {
  constructor(
    @InjectRouteController(AuthenticationController)
    public readonly controller: AuthenticationController
  ) {}

  get middlewares(): Middleware[] {
    return []
  }
}
