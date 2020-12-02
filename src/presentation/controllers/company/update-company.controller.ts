// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity, companyKeys } from '@/domain/entities'
import { UpdateCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyController implements Controller<CompanyDto, CompanyEntity> {

  constructor (
    @Inject()
    private readonly updateCompanyUseCase: UpdateCompanyUseCase
  ) { }

  @Validate<CompanyDto, CompanyEntity>({
    body: {
      schema: companySchema,
      keys: companyKeys,
      nullable: true,
      banned: ['members', 'planId']
    }
  })
  @HandleError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const requestCompanyDto = request.body as CompanyDto

    const updatedCompany = await this.updateCompanyUseCase.call(activeCompanyId, requestCompanyDto)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}