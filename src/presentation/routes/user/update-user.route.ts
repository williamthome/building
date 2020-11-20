import { UserEntity } from '@/domain/entities'
import { UpdateUserController } from '@/presentation/controllers'
import { AuthMiddleware } from '@/presentation/middlewares'
import { Controller, HttpMethods, Middleware, Route, RouteRequirement } from '@/presentation/protocols'
import { Inject, InjectableArray } from '@/shared/dependency-injection'

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