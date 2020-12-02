// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { memberSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, PlanLimitExceededError, UserAlreadyAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity, PlanEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase, GetCompanyMemberCountUseCase } from '@/domain/usecases'
import { MemberEntity, memberKeys } from '@/domain/entities/nested'

@Injectable()
export class AddCompanyMemberController implements Controller<MemberEntity, CompanyEntity> {

  constructor (
    @Inject()
    private readonly getCompanyMemberCountUseCase: GetCompanyMemberCountUseCase,

    @Inject()
    private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) { }

  @Validate<MemberEntity, CompanyEntity>({
    body: {
      schema: memberSchema,
      keys: memberKeys
    }
  })
  @HandleError
  async handle (request: HttpRequest<MemberEntity>): HandleResponse<CompanyEntity> {
    const activeCompanyPlanLimits = request.activeCompanyInfo?.limit as PlanEntity['limit']
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']

    if (activeCompanyPlanLimits !== 'unlimited') {
      const activeCompanyMemberCount = await this.getCompanyMemberCountUseCase.call(activeCompanyId)
      if (activeCompanyMemberCount === activeCompanyPlanLimits.member)
        return forbidden(new PlanLimitExceededError('members'))
    }

    const activeCompanyMembers = request.activeCompanyInfo?.members as MemberEntity[]
    const requestMemberDto = request.body as MemberEntity

    const alreadyAMember = activeCompanyMembers.some(
      companyMember => requestMemberDto.userId === companyMember.userId
    )
    if (alreadyAMember)
      return badRequest(new UserAlreadyAMemberError())

    const updatedCompany = await this.addCompanyMemberUseCase.call(activeCompanyId, requestMemberDto)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}