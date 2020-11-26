import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { AddUserController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { AddUserResponse, UserDto } from '@/domain/protocols'

@InjectableArray('routes')
export class AddUserRoute implements Route<UserDto, AddUserResponse> {
  constructor (
    @Inject(AddUserController)
    public readonly controller: AddUserController
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/user' }
  get middlewares(): Middleware[] { return [] }
}