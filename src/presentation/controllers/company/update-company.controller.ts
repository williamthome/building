// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
import { EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity, companyKeys } from '@/domain/entities'
import { GetPlanByIdUseCase, UpdateCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyController implements Controller<CompanyDto, CompanyEntity> {

  constructor (
    @Inject()
    private readonly getPlanByIdUseCase: GetPlanByIdUseCase,

    @Inject()
    private readonly updateCompanyUseCase: UpdateCompanyUseCase
  ) { }

  @ValidateBody<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys,
    nullable: true
  })
  @HandleError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const companyDto = request.body as CompanyDto

    const planIdKey: keyof CompanyEntity = 'planId'
    if (planIdKey in companyDto) {
      const plan = await this.getPlanByIdUseCase.call(companyDto.planId as CompanyEntity['planId'])
      if (!plan)
        return notFound(new EntityNotFoundError('Plan'))
    }

    const udpatedCompany = await this.updateCompanyUseCase.call(companyId, companyDto)
    if (!udpatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(udpatedCompany)
  }
}