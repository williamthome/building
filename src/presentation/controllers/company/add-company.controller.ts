// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserFeatures, CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleError, UsesTransaction, Validate } from '@/presentation/decorators'
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

  @Validate<CompanyDto, CompanyEntity>({
    body: {
      schema: companySchema,
      keys: companyKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const loggedUserId = request.loggedUserInfo?.id as UserEntity['id']
    const requestCompanyDto = request.body as CompanyDto
    const requestCompanyDtoPlanId = requestCompanyDto.planId as PlanEntity['id']

    const findedPlan = await this.getPlanByIdUseCase.call(requestCompanyDtoPlanId)
    if (!findedPlan)
      return notFound(new EntityNotFoundError('Plan'))

    requestCompanyDto.members = [{
      userId: loggedUserId,
      companyRole: CompanyRole.owner,
      features: UserFeatures.None
    }]

    const createdCompany = await this.addCompanyUseCase.call(requestCompanyDto)

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, createdCompany.id)

    return ok(createdCompany)
  }
}