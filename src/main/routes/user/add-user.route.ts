import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { AddUserController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { UserVerificationToken, UserDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AddUserRoute implements Route<UserDto, UserVerificationToken> {
  constructor (
    @Inject(AddUserController)
    public readonly controller: AddUserController
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/user' }
  get middlewares(): Middleware[] { return [] }
}