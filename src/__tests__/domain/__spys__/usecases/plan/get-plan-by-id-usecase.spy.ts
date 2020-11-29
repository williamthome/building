import { PlanEntity } from '@/domain/entities'
import { GetPlanByIdUseCase } from '@/domain/usecases'
import { mockPlanEntity } from '@/__tests__/domain/__mocks__/entities'

export class GetPlanByIdUseCaseSpy implements GetPlanByIdUseCase {
  id?: PlanEntity['id']
  planEntity?: PlanEntity | null
  override?: Partial<PlanEntity>
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: PlanEntity['id']): Promise<PlanEntity | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.planEntity = this.shouldReturnNull
      ? null
      : { ...mockPlanEntity(), id, ...this.override }

    return this.planEntity
  }
}