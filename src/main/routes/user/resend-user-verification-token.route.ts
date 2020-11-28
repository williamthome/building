import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { ResendUserVerificationTokenController } from '@/presentation/controllers'
import { UserVerificationToken } from '@/domain/protocols'

export const resendUserVerificationTokenPath = new RoutePath(
  'PATCH',
  '/user/verify'
)

@InjectableArray('routes')
export class ResendUserVerificationTokenRoute implements Route<undefined, UserVerificationToken> {
  constructor (
    @InjectRouteController(ResendUserVerificationTokenController)
    public readonly controller: ResendUserVerificationTokenController
  ) { }

  get path (): RoutePath { return resendUserVerificationTokenPath }
  get middlewares (): Middleware[] { return [] }
}