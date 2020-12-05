import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { ResendUserVerificationTokenController } from '@/presentation/controllers'
import { UserVerificationToken } from '@/domain/protocols'

export const resendUserVerificationTokenPath = new RoutePath(
  'PATCH',
  '/user/verify'
)

@InjectableRoute(resendUserVerificationTokenPath)
export class ResendUserVerificationTokenRoute implements Route<undefined, UserVerificationToken> {
  constructor (
    @InjectRouteController(ResendUserVerificationTokenController)
    public readonly controller: ResendUserVerificationTokenController
  ) { }

  get middlewares (): Middleware[] { return [] }
}