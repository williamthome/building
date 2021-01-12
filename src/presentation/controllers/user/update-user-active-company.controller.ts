// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, noContent, notFound } from '@/presentation/factories/http.factory'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
import { AccessDeniedError, EntityNotFoundError } from '@/presentation/errors'
// < Out: only domain layer
import { GetCompanyByIdUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { Company, User } from '@/domain/entities'
import { Schema } from '@/domain/protocols/schema'
import { idStringSchema } from '@/domain/protocols'

@InjectableController()
export class UpdateUserActiveCompanyController implements Controller<undefined, null> {
  constructor(
    @Inject()
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,

    @Inject()
    private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) {}

  @HandleError
  @Validate({
    params: {
      schema: new Schema({
        companyId: idStringSchema
      })
    }
  })
  async handle(request: HttpRequest): HandleResponse {
    const loggedUserId = request.loggedUserInfo?.id as User['id']
    const companyId = request.params?.companyId as Company['id']

    const findedCompany = await this.getCompanyByIdUseCase.call(companyId)
    if (!findedCompany) return notFound(new EntityNotFoundError('Company'))

    const loggedUserAsMemberOfFindedCompany = findedCompany.members.find(
      (companyMember) => loggedUserId === companyMember.userId
    )
    if (!loggedUserAsMemberOfFindedCompany) return forbidden(new AccessDeniedError())

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, companyId)

    return noContent()
  }
}
