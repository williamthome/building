import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { DeleteUserController } from '@/presentation/controllers'
import { UserEntityResponse } from '@/domain/protocols'

export const deleteUserPath = new RoutePath(
  'DELETE',
  '/user'
)

@InjectableArray('routes')
export class DeleteUserRoute implements Route<undefined, UserEntityResponse> {
  constructor (
    @InjectRouteController(DeleteUserController)
    public readonly controller: DeleteUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get path (): RoutePath { return deleteUserPath }
  get middlewares (): Middleware[] { return [this.authMiddleware] }
}