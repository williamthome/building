import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RouteRequirement } from '@/main/protocols'
import { AddUserController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'

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