// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
import { UserFeatures, CompanyRole } from '@/shared/constants'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleError, ValidateBody } from '@/presentation/decorators'
// < Out: only domain layer
import { CompanyEntity, companyKeys, UserEntity } from '@/domain/entities'
import { AddCompanyUseCase, UpdateUserActiveCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class AddCompanyController implements Controller<CompanyDto, CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyUseCase: AddCompanyUseCase,
    @Inject() private readonly updateUserActiveCompanyUseCase: UpdateUserActiveCompanyUseCase
  ) { }

  @ValidateBody<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys
  })
  @HandleError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const companyDto = request.body as CompanyDto
    const loggedUserId = request.loggedUserInfo?.id as UserEntity['id']

    companyDto.members = [{
      userId: loggedUserId,
      companyRole: CompanyRole.owner,
      features: UserFeatures.None
    }]

    const newCompany = await this.addCompanyUseCase.call(companyDto)

    await this.updateUserActiveCompanyUseCase.call(loggedUserId, newCompany.id)

    return ok(newCompany)
  }
}