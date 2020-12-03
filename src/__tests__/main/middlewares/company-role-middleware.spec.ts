import { CompanyRole } from '@/shared/constants'
import { CompanyRoleMiddleware } from '@/main/middlewares'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'

//#region Factories

interface SutTypes {
  sut: CompanyRoleMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new CompanyRoleMiddleware(CompanyRole.owner)
  return {
    sut
  }
}

//#endregion Factories

describe('CompanyRole Middleware', () => {
  it('should return unauthorized if logged user info is undefined', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(unauthorized())
  })

  it('should return unauthorized if company role is undefined', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {}
    })
    expect(response).toEqual(unauthorized())
  })

  it('should return unauthorized if no permission', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        companyRole: CompanyRole.master
      }
    })
    expect(response).toEqual(unauthorized())
  })

  it('should return no content if has permission', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      loggedUserInfo: {
        companyRole: CompanyRole.owner
      }
    })
    expect(response).toEqual(noContent())
  })
})