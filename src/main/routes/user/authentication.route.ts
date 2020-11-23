import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { AuthenticationController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'

@InjectableArray('routes')
export class AuthenticationRoute implements Route<UserEntity> {
  constructor (
    @Inject(AuthenticationController) public readonly controller: Controller<UserEntity>
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/login' }
  get middlewares(): Middleware[] { return [] }
}