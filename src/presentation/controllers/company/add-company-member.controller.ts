// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { badRequest, notFound, ok } from '@/presentation/factories/http.factory'
import { memberSchema } from '@/presentation/schemas'
import { HandleLogError, ValidateRequest } from '@/presentation/decorators'
import { CanNotFindEntityError, MissingParamError } from '@/presentation/errors'
// < Out: only domain layer
import { CompanyEntity } from '@/domain/entities'
import { AddCompanyMemberUseCase } from '@/domain/usecases'
import { Member, memberKeys } from '@/domain/entities/nested'

@Injectable()
export class AddCompanyMemberController implements Controller<Member, CompanyEntity> {

  constructor (
    @Inject() private readonly addCompanyMemberUseCase: AddCompanyMemberUseCase
  ) { }

  @ValidateRequest<Member, CompanyEntity>({
    schema: memberSchema,
    keys: memberKeys,
    nullable: false
  })
  @HandleLogError
  async handle (request: HttpRequest<Member>): HandleResponse<CompanyEntity> {
    const companyId = request.params?.id

    if (!companyId)
      return badRequest(new MissingParamError('id'))

    const member = request.body as Member

    const updatedCompany = await this.addCompanyMemberUseCase.call(companyId, member)
    if (!updatedCompany)
      return notFound(new CanNotFindEntityError('Company'))

    return ok(updatedCompany)
  }
}