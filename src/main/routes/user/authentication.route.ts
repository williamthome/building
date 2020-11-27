import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { AuthenticationController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { AuthDto, UserEntityResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class AuthenticationRoute implements Route<AuthDto, UserEntityResponse> {
  constructor (
    @Inject(AuthenticationController)
    public readonly controller: AuthenticationController
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/login' }
  get middlewares(): Middleware[] { return [] }
}