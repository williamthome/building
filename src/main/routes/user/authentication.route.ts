import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AuthenticationController } from '@/presentation/controllers'
import { HttpMethod } from '@/presentation/protocols'
import { AuthDto, UserEntityResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class AuthenticationRoute implements Route<AuthDto, UserEntityResponse> {
  constructor (
    @InjectRouteController(AuthenticationController)
    public readonly controller: AuthenticationController
  ) { }

  get method(): HttpMethod { return 'POST' }
  get path(): string { return '/login' }
  get middlewares(): Middleware[] { return [] }
}