import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddUserController } from '@/presentation/controllers'
import { UserVerificationTokenResponse } from '@/domain/protocols'
import { CreateUserDto } from '@/domain/entities'

export const addUserPath = new RoutePath(
  'POST',
  '/user'
)

@InjectableRoute(addUserPath)
export class AddUserRoute implements Route<CreateUserDto, UserVerificationTokenResponse> {
  constructor (
    @InjectRouteController(AddUserController)
    public readonly controller: AddUserController
  ) { }

  get middlewares(): Middleware[] { return [] }
}