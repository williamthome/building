// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { idParamKeys, idParamSchema, idParamSchemaOptions, memberSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { AccessDeniedError, EntityNotFoundError, UserIsNotAMemberError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { UpdateCompanyMemberUseCase } from '@/domain/usecases'
import { Member, memberKeys } from '@/domain/entities/nested'
import { MemberDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyMemberController implements Controller<MemberDto, CompanyEntity> {

  constructor (
    @Inject() private readonly updateCompanyMemberUseCase: UpdateCompanyMemberUseCase
  ) { }

  @ValidateBody<MemberDto, CompanyEntity>({
    schema: memberSchema,
    keys: memberKeys,
    nullable: true
  })
  @ValidateParams<MemberDto, CompanyEntity>({
    schema: {
      ...idParamSchema,
      userId: idParamSchemaOptions
    },
    keys: {
      ...idParamKeys,
      userId: 'userId'
    }
  })
  @HandleLogError
  async handle (request: HttpRequest<MemberDto>): HandleResponse<CompanyEntity> {
    const userId = request.params?.userId as Member['userId']
    const companyId = request.params?.id as CompanyEntity['id']
    const members = request.activeCompanyInfo?.members as Member[]
    const memberDto = request.body as MemberDto

    const member = members.find(companyMember => userId === companyMember.userId)
    if (!member)
      return badRequest(new UserIsNotAMemberError())

    if (member.companyRole === CompanyRole.owner)
      return forbidden(new AccessDeniedError())

    const updatedCompany = await this.updateCompanyMemberUseCase.call(companyId, userId, memberDto)
    if (!updatedCompany)
      return notFound(new EntityNotFoundError('Company'))

    return ok(updatedCompany)
  }
}