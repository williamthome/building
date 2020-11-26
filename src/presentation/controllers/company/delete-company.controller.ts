// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleLogError } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { DeleteCompanyUseCase } from '@/domain/usecases'

@Injectable()
export class DeleteCompanyController implements Controller<undefined, CompanyEntity> {

  constructor (
    @Inject() private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) { }

  @HandleLogError
  async handle (request: HttpRequest): HandleResponse<CompanyEntity> {
    const id = request.activeCompanyInfo?.id as CompanyEntity['id']

    const company = await this.deleteCompanyUseCase.call(id)
    if (!company)
      return notFound(new EntityNotFoundError('Company'))

    return ok(company)
  }
}