// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, noContent, notFound } from '@/presentation/factories/http.factory'
import { idParamSchemaOptions } from '@/presentation/schemas'
import { HandleLogError, ValidateParams } from '@/presentation/decorators'
// < Out: only domain layer
import { CompanyEntity, UserEntity } from '@/domain/entities'
import { GetCompanyByIdUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { AccessDeniedError, EntityNotFoundError } from '@/presentation/errors'

@Injectable()
export class UpdateUserActiveCompanyController implements Controller<undefined, null> {

  constructor (
    @Inject() private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,
    @Inject() private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) { }

  @ValidateParams<undefined, null>({
    schema: {
      companyId: idParamSchemaOptions
    },
    keys: {
      companyId: 'companyId'
    }
  })
  @HandleLogError
  async handle (request: HttpRequest): HandleResponse {
    const companyId = request.params?.companyId as CompanyEntity['id']
    const userId = request.loggedUserInfo?.id as UserEntity['id']

    const company = await this.getCompanyByIdUseCase.call(companyId)
    if (!company)
      return notFound(new EntityNotFoundError('Company'))

    const member = company.members.find(companyMember => userId === companyMember.userId)
    if (!member)
      return forbidden(new AccessDeniedError())

    await this.updateUserActiveCompanyUseCase.call(userId, companyId)

    return noContent()
  }
}