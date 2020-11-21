import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RouteRequirement } from '@/main/protocols'
import { UpdateUserController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'

@InjectableArray('routes')
export class UpdateUserRoute implements Route<UserEntity> {
  constructor (
    @Inject(UpdateUserController) public readonly controller: Controller<UserEntity>,
    @Inject(AuthMiddleware) public readonly authMiddleware: Middleware
  ) { }

  get method(): HttpMethods { return 'PATCH' }
  get path(): string { return '/user/:id' }
  get requirement(): RouteRequirement { return 'none' }
  get middlewares(): Middleware[] { return [this.authMiddleware] }
}