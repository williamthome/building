// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { notFound, ok } from '@/presentation/factories/http.factory'
import { companySchema, idParamKeys, idParamSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateBody, ValidateParams } from '@/presentation/decorators'
import { CanNotFindEntityError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity, companyKeys } from '@/domain/entities'
import { UpdateCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyController implements Controller<CompanyEntity> {

  constructor (
    @Inject() private readonly updateCompanyUseCase: UpdateCompanyUseCase
  ) { }

  @ValidateBody<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys,
    nullable: true
  })
  @ValidateParams<CompanyDto, CompanyEntity>({
    schema: idParamSchema,
    keys: idParamKeys
  })
  @HandleLogError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const companyId = request.params?.id as CompanyEntity['id']
    const companyDto = request.body as CompanyDto

    const udpatedCompany = await this.updateCompanyUseCase.call(companyId, companyDto)
    if (!udpatedCompany)
      return notFound(new CanNotFindEntityError('Company'))

    return ok(udpatedCompany)
  }
}