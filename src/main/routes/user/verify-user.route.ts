import { InjectableArray } from '@/shared/dependency-injection'
import { InjectTransaction } from '@/main/decorators'
import { Middleware, Route } from '@/main/protocols'
import { VerifyUserController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserEntityResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class VerifyUserRoute implements Route<undefined, UserEntityResponse> {
  constructor (
    @InjectTransaction(VerifyUserController)
    public readonly controller: VerifyUserController
  ) { }

  get method (): HttpMethods { return 'POST' }
  get path (): string { return '/user/verify' }
  get middlewares (): Middleware[] { return [] }
}