import { AllUserFeatures, CompanyRole, UserFeatures } from '@/shared/constants'
import { RequirementsMiddleware } from '@/main/middlewares'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'

//#region Factories

interface SutTypes {
  sut: RequirementsMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new RequirementsMiddleware(AllUserFeatures)
  return {
    sut
  }
}

//#endregion Factories

describe('Requirements Middleware', () => {
  it('should return unauthorized if logged user info is undefined', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(unauthorized())
  })

  it('should return unauthorized if company role is undefined', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        features: AllUserFeatures
      }
    })
    expect(response).toEqual(unauthorized())
  })

  it('should return unauthorized if features are undefined', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        companyRole: CompanyRole.owner
      }
    })
    expect(response).toEqual(unauthorized())
  })

  it('should return unauthorized if insuficient requirements', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        companyRole: CompanyRole.user,
        features: UserFeatures.None
      }
    })
    expect(response).toEqual(unauthorized())
  })

  it('should return no content if is company owner', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        companyRole: CompanyRole.owner,
        features: UserFeatures.None
      }
    })
    expect(response).toEqual(noContent())
  })

  it('should return no content if has requirements', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        companyRole: CompanyRole.user,
        features: AllUserFeatures
      }
    })
    expect(response).toEqual(noContent())
  })
})