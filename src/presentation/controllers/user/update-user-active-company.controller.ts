// : Shared
import { Inject } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, noContent, notFound } from '@/presentation/factories/http.factory'
import { idParamSchemaOptions } from '@/presentation/schemas'
import { HandleError, InjectableController, Validate } from '@/presentation/decorators'
// < Out: only domain layer
import { CompanyEntity, UserEntity } from '@/domain/entities'
import { GetCompanyByIdUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { AccessDeniedError, EntityNotFoundError } from '@/presentation/errors'

@InjectableController()
export class UpdateUserActiveCompanyController implements Controller<undefined, null> {

  constructor (
    @Inject()
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,

    @Inject()
    private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) { }

  @HandleError
  @Validate({
    params: {
      schema: {
        companyId: idParamSchemaOptions
      },
      keys: {
        companyId: 'companyId'
      }
    }
  })
  async handle (request: HttpRequest): HandleResponse {
    const loggedUserId = request.loggedUserInfo?.id as UserEntity['id']
    const requestCompanyId = request.params?.companyId as CompanyEntity['id']

    const findedCompany = await this.getCompanyByIdUseCase.call(requestCompanyId)
    if (!findedCompany)
      return notFound(new EntityNotFoundError('Company'))

    const loggedUserAsMemberOfFindedCompany = findedCompany.members.find(companyMember => loggedUserId === companyMember.userId)
    if (!loggedUserAsMemberOfFindedCompany)
      return forbidden(new AccessDeniedError())

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, requestCompanyId)

    return noContent()
  }
}