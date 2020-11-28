import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { VerifyUserController } from '@/presentation/controllers'
import { UserEntityResponse } from '@/domain/protocols'

export const verifyUserPath = new RoutePath(
  'POST',
  '/user/verify'
)

@InjectableArray('routes')
export class VerifyUserRoute implements Route<undefined, UserEntityResponse> {
  constructor (
    @InjectRouteController(VerifyUserController)
    public readonly controller: VerifyUserController
  ) { }

  get path (): RoutePath { return verifyUserPath }
  get middlewares (): Middleware[] { return [] }
}