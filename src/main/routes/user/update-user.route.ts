import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware, } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { UpdateUserController } from '@/presentation/controllers'
import { UserEntityDto, UserEntityResponse } from '@/domain/protocols'

export const updateUserPath = new RoutePath(
  'PATCH',
  '/user'
)

@InjectableArray('routes')
export class UpdateUserRoute implements Route<UserEntityDto, UserEntityResponse> {
  constructor (
    @InjectRouteController(UpdateUserController)
    public readonly controller: UpdateUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get path (): RoutePath { return updateUserPath }
  get middlewares (): Middleware[] {
    return [
      this.authMiddleware
    ]
  }
}