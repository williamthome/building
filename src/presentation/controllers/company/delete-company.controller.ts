// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { Company } from '@/domain/entities'
import { DeleteCompanyUseCase } from '@/domain/usecases'

@InjectableController({
  usesTransaction: true
})
export class DeleteCompanyController implements Controller<undefined, Company> {
  constructor(@Inject() private readonly deleteCompanyUseCase: DeleteCompanyUseCase) {}

  @HandleError
  async handle(request: HttpRequest): HandleResponse<Company> {
    const companyId = request.activeCompanyInfo?.id as Company['id']

    const deletedCompany = await this.deleteCompanyUseCase.call(companyId)
    if (!deletedCompany) return notFound(new EntityNotFoundError('Company'))

    return ok(deletedCompany)
  }
}
