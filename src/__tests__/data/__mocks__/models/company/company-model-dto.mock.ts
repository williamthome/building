import fakeData from '@/__tests__/shared/fake-data'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { mockPlanModel } from '../plan'
import { CompanyModelDto } from '@/data/protocols'

export const mockCompanyModelDto = (): CompanyModelDto => ({
  planId: mockPlanModel().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }]
})