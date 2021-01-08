import { Middleware, Route, RoutePath } from '@/main/protocols'
import { InjectableRoute, InjectRouteController } from '@/main/decorators'
import { GetUserByAccessTokenController } from '@/presentation/controllers'
import { UserResponse } from '@/domain/protocols'

export const getUserByAccessTokenPath = new RoutePath(
  'GET',
  '/user/by-access-token'
)

@InjectableRoute(getUserByAccessTokenPath)
export class GetUserByAccessTokenRoute implements Route<undefined, UserResponse> {
  constructor (
    @InjectRouteController(GetUserByAccessTokenController)
    public readonly controller: GetUserByAccessTokenController,
  ) { }

  get middlewares (): Middleware[] { return [] }
}