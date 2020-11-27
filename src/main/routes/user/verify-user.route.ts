import { InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { InjectRouteController } from '@/main/decorators'
import { VerifyUserController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserEntityResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class VerifyUserRoute implements Route<undefined, UserEntityResponse> {
  constructor (
    @InjectRouteController(VerifyUserController)
    public readonly controller: VerifyUserController
  ) { }

  get method (): HttpMethods { return 'POST' }
  get path (): string { return '/user/verify' }
  get middlewares (): Middleware[] { return [] }
}