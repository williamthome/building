import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateUserController } from '@/presentation/controllers'
import { HttpMethod } from '@/presentation/protocols'
import { UserDto, UserEntityResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class UpdateUserRoute implements Route<UserDto, UserEntityResponse> {
  constructor (
    @InjectRouteController(UpdateUserController)
    public readonly controller: UpdateUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get method (): HttpMethod { return 'PATCH' }
  get path (): string { return '/user' }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware
    ]
  }
}