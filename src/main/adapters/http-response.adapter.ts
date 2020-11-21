import { Controller } from '../../presentation/protocols'

export interface HttpResponseAdapter<Req, Res> {
  adaptHttpResponse: <T> (controller: Controller<T>) => (req: Req, res: Res) => void
}