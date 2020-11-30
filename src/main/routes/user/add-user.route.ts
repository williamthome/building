import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { AddUserController } from '@/presentation/controllers'
import { UserVerificationToken, UserEntityDto } from '@/domain/protocols'

export const addUserPath = new RoutePath(
  'POST',
  '/user'
)

@InjectableArray('routes')
export class AddUserRoute implements Route<UserEntityDto, UserVerificationToken> {
  constructor (
    @InjectRouteController(AddUserController)
    public readonly controller: AddUserController
  ) { }

  get path(): RoutePath { return addUserPath }
  get middlewares(): Middleware[] { return [] }
}