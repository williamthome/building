import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { ResendUserVerificationTokenController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserVerificationToken } from '@/domain/protocols'

@InjectableArray('routes')
export class ResendUserVerificationTokenRoute implements Route<undefined, UserVerificationToken> {
  constructor (
    @InjectRouteController(ResendUserVerificationTokenController)
    public readonly controller: ResendUserVerificationTokenController
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/user/verify' }
  get middlewares (): Middleware[] { return [] }
}