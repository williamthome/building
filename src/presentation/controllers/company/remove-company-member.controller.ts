// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, idParamSchemaOptions } from '@/presentation/schemas'
import { HandleLogError, ValidateRequest } from '@/presentation/decorators'
import { AccessDeniedError, CanNotFindEntityError, UserIsNotAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { RemoveCompanyMemberUseCase } from '@/domain/usecases'
import { Member } from '@/domain/entities/nested'
import { CompanyRole } from '@/shared/constants'

@Injectable()
export class RemoveCompanyMemberController implements Controller<undefined, CompanyEntity> {

  constructor (
    @Inject() private readonly removeCompanyMemberUseCase: RemoveCompanyMemberUseCase
  ) { }

  @ValidateRequest<undefined, CompanyEntity>({
    paramsSchema: {
      ...idParamSchema,
      userId: idParamSchemaOptions
    },
    paramKeys: {
      ...idParamKeys,
      userId: 'userId'
    }
  })
  @HandleLogError
  async handle (request: HttpRequest<undefined>): HandleResponse<CompanyEntity> {
    const userId = request.params?.userId as Member['userId']
    const companyId = request.params?.id as CompanyEntity['id']
    const members = request.activeCompanyInfo?.members as Member[]

    const member = members.find(companyMember => userId === companyMember.userId)
    if (!member)
      return badRequest(new UserIsNotAMemberError())

    if (member.companyRole === CompanyRole.owner)
      return forbidden(new AccessDeniedError())

    const updatedCompany = await this.removeCompanyMemberUseCase.call(companyId, userId)
    if (!updatedCompany)
      return notFound(new CanNotFindEntityError('Company'))

    return ok(updatedCompany)
  }
}