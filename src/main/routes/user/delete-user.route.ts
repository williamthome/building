import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { InjectTransaction } from '@/main/decorators'
import { AuthMiddleware } from '@/main/middlewares'
import { Middleware, Route } from '@/main/protocols'
import { DeleteUserController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserEntityResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class DeleteUserRoute implements Route<undefined, UserEntityResponse> {
  constructor (
    @InjectTransaction(DeleteUserController)
    public readonly controller: DeleteUserController,

    @Inject(AuthMiddleware)
    private readonly authMiddleware: Middleware
  ) { }

  get method (): HttpMethods { return 'DELETE' }
  get path (): string { return '/user' }
  get middlewares (): Middleware[] { return [this.authMiddleware] }
}