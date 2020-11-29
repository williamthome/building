// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserFeatures, CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleError, UsesTransaction, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { CompanyEntity, companyKeys, PlanEntity, UserEntity } from '@/domain/entities'
import { AddCompanyUseCase, GetPlanByIdUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'
import { EntityNotFoundError } from '@/presentation/errors'

@Injectable()
@UsesTransaction
export class AddCompanyController implements Controller<CompanyDto, CompanyEntity> {

  constructor (
    @Inject()
    private readonly getPlanByIdUseCase: GetPlanByIdUseCase,

    @Inject()
    private readonly addCompanyUseCase: AddCompanyUseCase,

    @Inject()
    private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase,
  ) { }

  @ValidateBody<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys
  })
  @HandleError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const loggedUserId = request.loggedUserInfo?.id as UserEntity['id']
    const companyDto = request.body as CompanyDto
    const planId = companyDto.planId as PlanEntity['id']

    const plan = await this.getPlanByIdUseCase.call(planId)
    if (!plan)
      return notFound(new EntityNotFoundError('Plan'))

    companyDto.members = [{
      userId: loggedUserId,
      companyRole: CompanyRole.owner,
      features: UserFeatures.None
    }]

    const company = await this.addCompanyUseCase.call(companyDto)

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, company.id)

    return ok(company)
  }
}