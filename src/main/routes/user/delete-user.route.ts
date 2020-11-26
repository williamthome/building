import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { DeleteUserController } from '@/presentation/controllers'
import { Controller, HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'

@InjectableArray('routes')
export class DeleteUserRoute implements Route<UserEntity> {
  constructor (
    @Inject(DeleteUserController)
    public readonly controller: Controller<UserEntity>,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/user' }
  get middlewares (): Middleware[] { return [this.authMiddleware] }
}