import fakeData from '@/__tests__/shared/fake-data'
import { CompanyModel } from '@/data/models'
import { ModelDto } from '@/data/protocols'
import { CompanyRole, UserFeatures } from '@/shared/constants'

export const mockCompanyModelDto = (): ModelDto<CompanyModel> => ({
  planId: fakeData.entity.id(),
  name: fakeData.person.fullName(),
  members: [{
    userId: fakeData.entity.id(),
    companyRole: CompanyRole.owner,
    features: UserFeatures.None
  }]
})