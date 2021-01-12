// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetCompanyByIdUseCase } from '@/domain/usecases'
import { Company } from '@/domain/entities'

@InjectableController()
export class GetUserActiveCompanyController implements Controller<undefined, Company> {
  constructor(
    @Inject()
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase
  ) {}

  @HandleError
  async handle(request: HttpRequest): HandleResponse<Company> {
    const id = request.activeCompanyInfo?.id as Company['id']

    const findedCompany = await this.getCompanyByIdUseCase.call(id)
    if (!findedCompany) return notFound(new EntityNotFoundError('Company'))

    return ok(findedCompany)
  }
}
