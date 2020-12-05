import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { AddUserController } from '@/presentation/controllers'
import { UserVerificationToken, UserEntityDto } from '@/domain/protocols'

export const addUserPath = new RoutePath(
  'POST',
  '/user'
)

@InjectableRoute(addUserPath)
export class AddUserRoute implements Route<UserEntityDto, UserVerificationToken> {
  constructor (
    @InjectRouteController(AddUserController)
    public readonly controller: AddUserController
  ) { }

  get middlewares(): Middleware[] { return [] }
}