import { UserEntity } from '@/domain/entities'
import { AddUserController } from '@/presentation/controllers'
import { Controller, HttpMethods, Middleware, Route, RouteRequirement } from '@/presentation/protocols'
import { Inject, InjectableArray } from '@/shared/dependency-injection'

@InjectableArray('routes')
export class AddUserRoute implements Route<UserEntity> {
  constructor (
    @Inject(AddUserController) public readonly controller: Controller<UserEntity>
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/user' }
  get requirement(): RouteRequirement { return 'none' }
  get middlewares(): Middleware[] { return [] }
}