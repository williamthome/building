// : Shared
import { Inject } from '@/shared/dependency-injection'
import { CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, notFound, ok } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import {
  AccessDeniedError,
  CanNotAddMoreOwnesrError,
  CanNotModifyOwnerError,
  EntityNotFoundError,
  UserIsNotAMemberError
} from '@/presentation/errors'
// < Out: only domain layer
import { UpdateCompanyMemberUseCase } from '@/domain/usecases'
import { Company } from '@/domain/entities'
import { Member, memberSchema, UpdateMemberDto } from '@/domain/entities/nested'
import { Schema, string } from '@/domain/protocols/schema'

@InjectableController()
export class UpdateCompanyMemberController implements Controller<UpdateMemberDto, Company> {

  constructor (
    @Inject() private readonly updateCompanyMemberUseCase: UpdateCompanyMemberUseCase
  ) { }

  @HandleError
  @Validate({
    body: {
      schema: memberSchema,
      options: {
        allKeys: false,
        bannedFields: ['userId']
      }
    },
    params: {
      schema: new Schema({
        id: string().required()
      })
    }
  })
  async handle (request: HttpRequest<UpdateMemberDto>): HandleResponse<Company> {
    const loggedUserCompanyRole = request.loggedUserInfo?.companyRole
    const activeCompanyId = request.activeCompanyInfo?.id as Company['id']
    const activeCompanyMembers = request.activeCompanyInfo?.members as Member[]
    const userIdToUpdate = request.params?.id as Member['userId']
    const updateMemberDto = request.body as UpdateMemberDto

    const memberToUpdate = activeCompanyMembers.find(companyMember => userIdToUpdate === companyMember.userId)
    if (!memberToUpdate)
      return badRequest(new UserIsNotAMemberError())

    if (memberToUpdate.companyRole === CompanyRole.owner)
      return forbidden(new CanNotModifyOwnerError())

    if (updateMemberDto.companyRole === CompanyRole.owner)
      return forbidden(new CanNotAddMoreOwnesrError())

    if (updateMemberDto.companyRole === CompanyRole.master &&
      loggedUserCompanyRole !== CompanyRole.master)
      return forbidden(new AccessDeniedError())

    const activeCompanyWithUpdatedMember = await this.updateCompanyMemberUseCase.call(
      activeCompanyId, userIdToUpdate, updateMemberDto
    )
    if (!activeCompanyWithUpdatedMember)
      return notFound(new EntityNotFoundError('Company'))

    return ok(activeCompanyWithUpdatedMember)
  }
}