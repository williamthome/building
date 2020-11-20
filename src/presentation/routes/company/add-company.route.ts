import { CompanyEntity } from '@/domain/entities'
import { AddCompanyController } from '@/presentation/controllers'
import { Controller, HttpMethods, Route, RouteRequirement } from '@/presentation/protocols'
import { Inject, InjectableArray } from '@/shared/dependency-injection'

@InjectableArray('routes')
export class AddCompanyRoute implements Route<CompanyEntity> {
  constructor (
    @Inject(AddCompanyController) public readonly controller: Controller<CompanyEntity>
  ) { }

  get method(): HttpMethods { return 'POST' }
  get path(): string { return '/company' }
  get requirement(): RouteRequirement { return 'none' }
}