import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { VerifyUserController } from '@/presentation/controllers'
import { UserResponse } from '@/domain/protocols'

export const verifyUserPath = new RoutePath('POST', '/user/verify')

@InjectableRoute(verifyUserPath)
export class VerifyUserRoute implements Route<undefined, UserResponse> {
  constructor(
    @InjectRouteController(VerifyUserController)
    public readonly controller: VerifyUserController
  ) {}

  get middlewares(): Middleware[] {
    return []
  }
}
