import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, ParamIdMatchLoggedUserIdMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { UpdateUserController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'

@InjectableArray('routes')
export class UpdateUserRoute implements Route<UserEntity> {
  constructor (
    @Inject(UpdateUserController)
    public readonly controller: Controller<UserEntity>,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware,

    @Inject(ParamIdMatchLoggedUserIdMiddleware)
    private readonly paramIdMatchLoggedUserIdMiddleware: ParamIdMatchLoggedUserIdMiddleware
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/user/:id' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware,
      this.paramIdMatchLoggedUserIdMiddleware
    ]
  }
}