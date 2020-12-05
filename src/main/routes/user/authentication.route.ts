import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AuthenticationController } from '@/presentation/controllers'
import { AuthEntityDto, UserEntityResponse } from '@/domain/protocols'

export const authenticationPath = new RoutePath(
  'POST',
  '/login'
)

@InjectableRoute(authenticationPath)
export class AuthenticationRoute implements Route<AuthEntityDto, UserEntityResponse> {
  constructor (
    @InjectRouteController(AuthenticationController)
    public readonly controller: AuthenticationController
  ) { }

  get middlewares(): Middleware[] { return [] }
}