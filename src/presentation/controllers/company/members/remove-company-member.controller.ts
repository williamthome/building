// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleError, ValidateParams } from '@/presentation/decorators'
import { CanNotDeleteOwnerError, EntityNotFoundError, UserIsNotAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { GetUserByIdUseCase, RemoveCompanyMemberUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { MemberEntity } from '@/domain/entities/nested'
import { CompanyRole } from '@/shared/constants'

@Injectable()
export class RemoveCompanyMemberController implements Controller<undefined, CompanyEntity> {

  constructor (
    @Inject() private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject() private readonly removeCompanyMemberUseCase: RemoveCompanyMemberUseCase,
    @Inject() private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) { }

  @ValidateParams<undefined, CompanyEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleError
  async handle (request: HttpRequest<undefined>): HandleResponse<CompanyEntity> {
    const companyId = request.activeCompanyInfo?.id as CompanyEntity['id']
    const members = request.activeCompanyInfo?.members as MemberEntity[]
    const userId = request.params?.id as MemberEntity['userId']

    const member = members.find(companyMember => userId === companyMember.userId)
    if (!member)
      return badRequest(new UserIsNotAMemberError())

    if (member.companyRole === CompanyRole.owner)
      return forbidden(new CanNotDeleteOwnerError())

    const user = await this.getUserByIdUseCase.call(userId)
    if (!user)
      return notFound(new EntityNotFoundError('User'))

    const updatedCompany = await this.removeCompanyMemberUseCase.call(companyId, userId)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    if (user.activeCompanyId === companyId)
      await this.updateUserActiveCompanyUseCase.call(userId, undefined)

    return ok(updatedCompany)
  }
}