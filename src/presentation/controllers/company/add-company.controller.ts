// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserFeatures, UserRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleLogError, ValidateRequest } from '@/presentation/decorators'
import { AccessDeniedError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity, companyKeys } from '@/domain/entities'
import { AddCompanyUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class AddCompanyController implements Controller<CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyUseCase: AddCompanyUseCase,
    @Inject() private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) { }

  @ValidateRequest<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys,
    nullable: false
  })
  @HandleLogError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const companyDto = request.body as CompanyDto
    const loggedUserId = request.loggedUserInfo?.id

    if (!loggedUserId)
      return forbidden(new AccessDeniedError())

    companyDto.members = [{
      userId: loggedUserId,
      role: UserRole.owner,
      features: UserFeatures.None
    }]

    const newCompany = await this.addCompanyUseCase.call(companyDto)

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, newCompany.id)

    return ok(newCompany)
  }
}