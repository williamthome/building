// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { memberSchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
import { EntityNotFoundError, UserAlreadyAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { MemberEntity, memberKeys } from '@/domain/entities/nested'

@Injectable()
export class AddCompanyMemberController implements Controller<MemberEntity, CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) { }

  @ValidateBody<MemberEntity, CompanyEntity>({
    schema: memberSchema,
    keys: memberKeys
  })
  @HandleError
  async handle (request: HttpRequest<MemberEntity>): HandleResponse<CompanyEntity> {
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const members = request.activeCompanyInfo?.members as MemberEntity[]
    const member = request.body as MemberEntity

    const alreadyAMember = members.some(companyMember => member.userId === companyMember.userId)
    if (alreadyAMember)
      return badRequest(new UserAlreadyAMemberError())

    const updatedCompany = await this.addCompanyMemberUseCase.call(companyId, member)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}