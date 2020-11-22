// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { companySchema } from '@/presentation/schemas'
import { HandleLogError, ValidateRequest } from '@/presentation/decorators'
import { CanNotFindEntityError, MissingParamError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity, companyKeys } from '@/domain/entities'
import { UpdateCompanyUseCase } from '@/domain/usecases'
import { CompanyDto } from '@/domain/protocols'

@Injectable()
export class UpdateCompanyController implements Controller<CompanyEntity> {

  constructor (
    @Inject() private readonly updateCompanyUseCase: UpdateCompanyUseCase
  ) { }

  @ValidateRequest<CompanyDto, CompanyEntity>({
    schema: companySchema,
    keys: companyKeys,
    nullable: true
  })
  @HandleLogError
  async handle (request: HttpRequest<CompanyDto>): HandleResponse<CompanyEntity> {
    const id = request.params?.id

    if (!id)
      return badRequest(new MissingParamError('id'))

    const companyDto = request.body as CompanyDto
    const udpatedCompany = await this.updateCompanyUseCase.call(id, companyDto)

    if (!udpatedCompany)
      return notFound(new CanNotFindEntityError('Company'))

    return ok(udpatedCompany)
  }
}