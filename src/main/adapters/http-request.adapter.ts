import { AdaptMiddlewareHttpRequest } from '../protocols'

export interface HttpRequestAdapter<Req> {
  adaptHttpRequest: <T> (req: Req) => AdaptMiddlewareHttpRequest<T>
}