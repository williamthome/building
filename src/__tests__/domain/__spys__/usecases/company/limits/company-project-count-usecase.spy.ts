import { CompanyEntity } from '@/domain/entities'
import { GetCompanyProjectCountUseCase } from '@/domain/usecases'

export class GetCompanyProjectCountUseCaseSpy implements GetCompanyProjectCountUseCase {
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