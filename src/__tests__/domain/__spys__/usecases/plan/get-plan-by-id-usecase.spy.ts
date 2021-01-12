import { Plan } from '@/domain/entities'
import { GetPlanByIdUseCase } from '@/domain/usecases'
import { mockPlan } from '@/__tests__/domain/__mocks__/entities'

export class GetPlanByIdUseCaseSpy implements GetPlanByIdUseCase {
  id?: Plan['id']
  plan?: Plan | null
  override?: Partial<Plan>
  shouldReturnNull = false
  shouldThrow = false

  call = async (id: Plan['id']): Promise<Plan | null> => {
    this.id = id

    if (this.shouldThrow) throw new Error()

    this.plan = this.shouldReturnNull ? null : { ...mockPlan(), id, ...this.override }

    return this.plan
  }
}
