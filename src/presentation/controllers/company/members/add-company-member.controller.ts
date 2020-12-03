// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { memberSchema } from '@/presentation/schemas'
import { HandleError, Validate } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity, memberKeys } from '@/domain/entities/nested'
import { userIsMember } from '@/domain/helpers/user.helper'

@Injectable()
export class AddCompanyMemberController implements Controller<MemberEntity, CompanyEntity> {

  constructor (
    @Inject()
    private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) { }

  @HandleError
  @Validate<MemberEntity, CompanyEntity>({
    planLimitFor: 'member',
    body: {
      schema: memberSchema,
      keys: memberKeys
    }
  })
  async handle (request: HttpRequest<MemberEntity>): HandleResponse<CompanyEntity> {
    const activeCompanyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as MemberEntity[]
    const requestMemberDto = request.body as MemberEntity

    const alreadyAMember = userIsMember(activeCompanyMembers, requestMemberDto.userId)
    if (alreadyAMember)
      return badRequest(new UserAlreadyAMemberError())

    const updatedCompany = await this.addCompanyMemberUseCase.call(activeCompanyId, requestMemberDto)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}