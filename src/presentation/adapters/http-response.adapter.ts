import { Controller } from '../protocols'

export interface HttpResponseAdapter<Req, Res> {
  adaptHttpResponse: <T> (controller: Controller<T>) => (req: Req, res: Res) => void
}