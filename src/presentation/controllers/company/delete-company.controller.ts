// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, UsesTransaction } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { DeleteCompanyUseCase } from '@/domain/usecases'

@Injectable()
@UsesTransaction
export class DeleteCompanyController implements Controller<undefined, CompanyEntity> {

  constructor (
    @Inject() private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) { }

  @HandleError
  async handle (request: HttpRequest): HandleResponse<CompanyEntity> {
    const requestCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']

    const deletedCompany = await this.deleteCompanyUseCase.call(requestCompanyId)
    if (!deletedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(deletedCompany)
  }
}