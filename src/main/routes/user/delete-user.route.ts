import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { DeleteUserController } from '@/presentation/controllers'
import { UserResponse } from '@/domain/protocols'

export const deleteUserPath = new RoutePath('DELETE', '/user')

@InjectableRoute(deleteUserPath)
export class DeleteUserRoute implements Route<undefined, UserResponse> {
  constructor(
    @InjectRouteController(DeleteUserController)
    public readonly controller: DeleteUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware]
  }
}
