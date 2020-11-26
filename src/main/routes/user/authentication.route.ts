import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { AuthenticationController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'
import { AuthDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AuthenticationRoute implements Route<AuthDto, UserEntity> {
  constructor (
    @Inject(AuthenticationController)
    public readonly controller: AuthenticationController
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/login' }
  get middlewares(): Middleware[] { return [] }
}