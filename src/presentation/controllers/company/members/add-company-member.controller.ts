// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { Company } from '@/domain/entities'
import { CreateMemberDto, Member, memberSchema } from '@/domain/entities/nested'
import { userIsMember } from '@/domain/helpers/user.helper'

@InjectableController()
export class AddCompanyMemberController implements Controller<CreateMemberDto, Company> {
  constructor(
    @Inject()
    private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) {}

  @HandleError
  @Validate({
    planLimitFor: 'member',
    body: {
      schema: memberSchema
    }
  })
  async handle(request: HttpRequest<CreateMemberDto>): HandleResponse<Company> {
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as Member[]
    const createMemberDto = request.body as CreateMemberDto

    const alreadyAMember = userIsMember(activeCompanyMembers, createMemberDto.userId)
    if (alreadyAMember) return badRequest(new UserAlreadyAMemberError())

    const updatedCompany = await this.addCompanyMemberUseCase.call(activeCompanyId, createMemberDto)
    if (!updatedCompany) return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}
