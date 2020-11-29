import fakeData from '@/__tests__/shared/fake-data'
import { CompanyModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { CompanyRole, UserFeatures } from '@/shared/constants'
import { mockPlanModel } from '../plan'

export const mockCompanyModel = (companyDto?: ModelDto<CompanyModel>): CompanyModel => ({
  id: fakeData.entity.id(),
  planId: mockPlanModel().id,
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }],
  ...companyDto,
})