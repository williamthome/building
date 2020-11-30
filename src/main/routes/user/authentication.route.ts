import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AuthenticationController } from '@/presentation/controllers'
import { AuthEntityDto, UserEntityResponse } from '@/domain/protocols'

export const authenticationPath = new RoutePath(
  'POST',
  '/login'
)

@InjectableArray('routes')
export class AuthenticationRoute implements Route<AuthEntityDto, UserEntityResponse> {
  constructor (
    @InjectRouteController(AuthenticationController)
    public readonly controller: AuthenticationController
  ) { }

  get path(): RoutePath { return authenticationPath }
  get middlewares(): Middleware[] { return [] }
}