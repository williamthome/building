import { Database } from '@/infra/protocols'
import { Inject } from '@/shared/dependency-injection'
import { HttpStatusCode } from '@/presentation/constants'
import { Controller, HandleResponse, HttpRequest } from '@/presentation/protocols'

export class TransactionController<TRequest, TResponse> implements Controller<TRequest, TResponse> {
  @Inject()
  private readonly db!: Database

  constructor (
    private readonly controller: Controller<TRequest, TResponse>
  ) { }

  handle = async (request: HttpRequest<TRequest>): HandleResponse<TResponse> => {
    await this.db.startTransaction()

    const response = await this.controller.handle(request)

    if (response.statusCode >= HttpStatusCode.BAD_REQUEST)
      await this.db.rollback()
    else
      await this.db.commitTransaction()

    return response
  }
}