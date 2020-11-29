import { CompanyEntity } from '@/domain/entities'
import { GetCompanyMemberCountUseCase } from '@/domain/usecases'

export class GetCompanyMemberCountUseCaseSpy implements GetCompanyMemberCountUseCase {
  id?: CompanyEntity['id']
  count?: number
  override?: number
  shouldThrow = false

  call = async (id: CompanyEntity['id']): Promise<number> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.count = this.override
      ? this.override
      : 0

    return this.count
  }
}