import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { UpdateUserController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserEntity } from '@/domain/entities'
import { UserDto } from '@/domain/protocols'

@InjectableArray('routes')
export class UpdateUserRoute implements Route<UserDto, UserEntity> {
  constructor (
    @Inject(UpdateUserController)
    public readonly controller: UpdateUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/user' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware
    ]
  }
}