import { UserEntity } from '@/domain/entities'
import { AuthenticationController } from '@/presentation/controllers'
import { Controller, HttpMethods, Route, RouteRequirement } from '@/presentation/protocols'
import { Inject, InjectableArray } from '@/shared/dependency-injection'

@InjectableArray('routes')
export class AuthenticationRoute implements Route<UserEntity> {
  constructor (
    @Inject(AuthenticationController) public readonly controller: Controller<UserEntity>
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/login' }
  get requirement(): RouteRequirement { return 'none' }
}