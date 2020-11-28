import { Inject } from '@/shared/dependency-injection'
import { Database } from '@/infra/protocols'
import { HttpStatusCode } from '@/presentation/constants'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'
import { LogErrorUseCase } from '@/domain/usecases'
import { errorStack } from '@/domain/helpers/log.helper'

export class TransactionController<TRequest, TResponse> implements Controller<TRequest, TResponse> {
  @Inject()
  private readonly db!: Database

  @Inject()
  private readonly logErrorUseCase!: LogErrorUseCase

  constructor (
    private readonly controller: Controller<TRequest, TResponse>
  ) { }

  handle = async (request: HttpRequest<TRequest>): HandleResponse<TResponse> => {
    await this.db.startTransaction()

    const response = await this.controller.handle(request)

    if (response.statusCode >= HttpStatusCode.BAD_REQUEST) {
      await this.db.rollback()
    } else {
      await this.db.commitTransaction()
    }

    if (response.statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      if (this.logErrorUseCase) {
        await this.logErrorUseCase.call({
          stack: errorStack(response.body),
          date: new Date().getTime()
        })
      }
    }

    return response
  }
}