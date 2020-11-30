// : Shared
import { Inject, Injectable } from '@/shared/dependency-injection'
// > In: presentation layer
import { Controller, HandleResponse } from '@/presentation/protocols'
import { noContent } from '@/presentation/factories/http.factory'
import { HandleError } from '@/presentation/decorators'
// < Out: only domain layer

// !! TEST
import { Storage } from '@/infra/protocols'

@Injectable()
export class DownloadProjectAttachmentController implements Controller<undefined, null> {

  constructor (
    @Inject()
    private readonly storage: Storage,
  ) { }

  @HandleError
  async handle (/* request: HttpRequest<undefined> */): HandleResponse {

    await this.storage.download('test.txt')

    return noContent()
  }
}