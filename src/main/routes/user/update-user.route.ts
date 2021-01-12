import { Inject } from '@/shared/dependency-injection'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { UpdateUserController } from '@/presentation/controllers'
import { UserResponse } from '@/domain/protocols'
import { UpdateUserDto } from '@/domain/entities'

export const updateUserPath = new RoutePath('PATCH', '/user')

@InjectableRoute(updateUserPath)
export class UpdateUserRoute implements Route<UpdateUserDto, UserResponse> {
  constructor(
    @InjectRouteController(UpdateUserController)
    public readonly controller: UpdateUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) {}

  get middlewares(): Middleware[] {
    return [this.authMiddleware]
  }
}
