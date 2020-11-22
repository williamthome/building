import { Injectable } from '@/shared/dependency-injection'
import { UserFeatures } from '@/shared/constants'
import { Middleware, MiddlewareResponse } from '../protocols'
import { hasRequirements } from '../helpers/middleware.helper'
import { noContent, unauthorized } from '@/presentation/factories/http.factory'
import { HttpRequest } from '@/presentation/protocols'
import { HandleLogError } from '@/presentation/decorators'

@Injectable()
export class RequirementsMiddleware implements Middleware {

  constructor (
    private readonly requirements: UserFeatures
  ) { }

  @HandleLogError
  async handle<T> (httpRequest: HttpRequest<T>): MiddlewareResponse {
    return hasRequirements(httpRequest, this.requirements)
      ? noContent()
      : unauthorized()
  }
}