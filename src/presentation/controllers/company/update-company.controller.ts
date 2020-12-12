// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { UpdateCompanyUseCase } from '@/domain/usecases'
import { Company, companySchema, UpdateCompanyDto } from '@/domain/entities'

@InjectableController()
export class UpdateCompanyController implements Controller<UpdateCompanyDto, Company> {

  constructor (
    @Inject()
    private readonly updateCompanyUseCase: UpdateCompanyUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: companySchema,
      options: {
        allKeys: false,
        bannedFields: ['planId']
      }
    }
  })
  async handle (request: HttpRequest<UpdateCompanyDto>): HandleResponse<Company> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const updateCompanyDto = request.body as UpdateCompanyDto

    const updatedCompany = await this.updateCompanyUseCase.call(activeCompanyId, updateCompanyDto)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}