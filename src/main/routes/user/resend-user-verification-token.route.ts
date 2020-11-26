import { Inject, InjectableArray } from '@/shared/dependency-injection'
import { Middleware, Route } from '@/main/protocols'
import { ResendUserVerificationTokenController } from '@/presentation/controllers'
import { HttpMethods } from '@/presentation/protocols'
import { AddUserResponse } from '@/domain/protocols'

@InjectableArray('routes')
export class ResendUserVerificationTokenRoute implements Route<undefined, AddUserResponse> {
  constructor (
    @Inject(ResendUserVerificationTokenController)
    public readonly controller: ResendUserVerificationTokenController
  ) { }

  get method (): HttpMethods { return 'PATCH' }
  get path (): string { return '/user/verify' }
  get middlewares (): Middleware[] { return [] }
}